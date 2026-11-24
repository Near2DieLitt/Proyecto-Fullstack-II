package com.sonidovivo.gestion_catalogo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import com.sonidovivo.gestion_catalogo.dto.ProductoRequestDTO;
import com.sonidovivo.gestion_catalogo.exception.ConflictException;
import com.sonidovivo.gestion_catalogo.exception.NotFoundException;
import com.sonidovivo.gestion_catalogo.model.Categoria;
import com.sonidovivo.gestion_catalogo.model.Marca;
import com.sonidovivo.gestion_catalogo.model.Producto;
import com.sonidovivo.gestion_catalogo.repository.CategoriaRepository;
import com.sonidovivo.gestion_catalogo.repository.MarcaRepository;
import com.sonidovivo.gestion_catalogo.repository.ProductoRepository;

@ExtendWith(MockitoExtension.class)
class CatalogoServiceTest {

    @Mock
    private CategoriaRepository categoriaRepository;

    @Mock
    private MarcaRepository marcaRepository;

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private CatalogoBaseService catalogoBaseService;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void creaCategoriaMarcaYProducto() {
        Categoria categoria = new Categoria();
        categoria.setId(1L);
        Marca marca = new Marca();
        marca.setId(2L);

        when(categoriaRepository.existsByNombre("Rock")).thenReturn(false);
        when(marcaRepository.existsByNombre("Yamaha")).thenReturn(false);
        when(categoriaRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(marcaRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria));
        when(marcaRepository.findById(2L)).thenReturn(Optional.of(marca));
        when(productoRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        assertEquals("Rock", catalogoBaseService.crearCategoria(" Rock ").getNombre());
        assertEquals("Yamaha", catalogoBaseService.crearMarca(" Yamaha ").getNombre());
        assertEquals("Guitarra", productoService.crear(new ProductoRequestDTO(
                " Guitarra ", BigDecimal.TEN, 1L, 2L, null, null, true)).getNombre());
    }

    @Test
    void validaCategoriaDuplicadaYProductoAusente() {
        when(categoriaRepository.existsByNombre("Rock")).thenReturn(true);
        when(productoRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ConflictException.class, () -> catalogoBaseService.crearCategoria("Rock"));
        assertThrows(NotFoundException.class, () -> productoService.findByIdOrThrow(1L));
    }

    @Test
    void actualizaEliminaYListaProductos() {
        Categoria categoria = new Categoria();
        categoria.setId(1L);
        Marca marca = new Marca();
        marca.setId(2L);
        ProductoRequestDTO request = new ProductoRequestDTO(
                " Bajo ", BigDecimal.ONE, 1L, 2L, "desc", "img", false);
        Producto producto = new Producto();
        producto.setId(7L);

        when(productoRepository.findById(7L)).thenReturn(Optional.of(producto));
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria));
        when(marcaRepository.findById(2L)).thenReturn(Optional.of(marca));
        when(productoRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(productoRepository.findAll(any(Specification.class))).thenReturn(List.of(producto));

        assertEquals("Bajo", productoService.actualizar(7L, request).getNombre());
        assertEquals(1, productoService.listar(null, null, null, null, null, null).size());
        productoService.eliminar(7L);
        verify(productoRepository).delete(producto);
    }

    @Test
    void fallaCuandoCategoriaOMarcaNoExisten() {
        ProductoRequestDTO request = new ProductoRequestDTO(
                "Producto", BigDecimal.ONE, 1L, 2L, null, null, null);
        when(categoriaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> productoService.crear(request));

        Categoria categoria = new Categoria();
        when(categoriaRepository.findById(1L)).thenReturn(Optional.of(categoria));
        when(marcaRepository.findById(2L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> productoService.crear(request));
    }

    @Test
    @SuppressWarnings({ "unchecked", "rawtypes" })
    void construyeFiltrosDeBusquedaDeProductos() {
        when(productoRepository.findAll(any(Specification.class))).thenAnswer(invocation -> {
            Specification<Producto> specification = invocation.getArgument(0);
            Root<Producto> root = org.mockito.Mockito.mock(Root.class,
                    org.mockito.Answers.RETURNS_DEEP_STUBS);
            CriteriaQuery<Producto> query = org.mockito.Mockito.mock(CriteriaQuery.class);
            CriteriaBuilder criteriaBuilder = org.mockito.Mockito.mock(CriteriaBuilder.class,
                    org.mockito.Answers.RETURNS_DEEP_STUBS);
            specification.toPredicate(root, query, criteriaBuilder);
            return List.of();
        });

        assertEquals(0, productoService.listar(1L, 2L, BigDecimal.ONE,
                BigDecimal.TEN, " guitarra ", true).size());
    }
}
