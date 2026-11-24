package com.sonidovivo.gestion_inventario.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_inventario.client.CatalogoClient;
import com.sonidovivo.gestion_inventario.dto.MovimientoRequestDTO;
import com.sonidovivo.gestion_inventario.dto.InventarioRequestDTO;
import com.sonidovivo.gestion_inventario.exception.ConflictException;
import com.sonidovivo.gestion_inventario.model.Inventario;
import com.sonidovivo.gestion_inventario.repository.BodegaRepository;
import com.sonidovivo.gestion_inventario.repository.InventarioRepository;
import com.sonidovivo.gestion_inventario.repository.MovimientoInventarioRepository;

@ExtendWith(MockitoExtension.class)
class InventarioServiceTest {
    @Mock private InventarioRepository inventarioRepo;
    @Mock private BodegaRepository bodegaRepo;
    @Mock private MovimientoInventarioRepository movimientoRepo;
    @Mock private CatalogoClient catalogoClient;
    @InjectMocks private InventarioService service;

    @Test
    void descontarReduceStockYDevuelveTotal() {
        Inventario inventario = new Inventario();
        inventario.setId(1L);
        inventario.setIdProducto(4L);
        inventario.setStockActual(10);
        when(inventarioRepo.findByIdProductoOrderByIdAsc(4L)).thenReturn(List.of(inventario));
        when(inventarioRepo.save(any(Inventario.class))).thenAnswer(i -> i.getArgument(0));

        var result = service.descontar(new MovimientoRequestDTO(4L, 3, "Venta", 20L));

        assertEquals(7, inventario.getStockActual());
        assertEquals(7, result.getStockTotal());
    }

    @Test
    void descontarSinStockSuficienteLanzaConflicto() {
        Inventario inventario = new Inventario();
        inventario.setStockActual(1);
        when(inventarioRepo.findByIdProductoOrderByIdAsc(4L)).thenReturn(List.of(inventario));

        assertThrows(ConflictException.class,
                () -> service.descontar(new MovimientoRequestDTO(4L, 2, null, null)));
    }

    @Test
    void agregaStockYCreaBodega() {
        Inventario inventario = new Inventario();
        inventario.setIdProducto(4L);
        inventario.setStockActual(2);
        when(inventarioRepo.findByIdProductoOrderByIdAsc(4L)).thenReturn(List.of(inventario));
        when(inventarioRepo.save(any(Inventario.class))).thenAnswer(i -> i.getArgument(0));
        when(bodegaRepo.existsByNombre("Central")).thenReturn(false);
        when(bodegaRepo.save(any())).thenAnswer(i -> i.getArgument(0));

        assertEquals(5, service.agregar(new MovimientoRequestDTO(4L, 3, null, null)).getStockTotal());
        assertEquals("Central", service.crearBodega("  Central ", "Norte").getNombre());
        verify(movimientoRepo, org.mockito.Mockito.atLeastOnce()).save(any());
    }

    @Test
    void erroresDeStockYBodegaSeCubren() {
        when(inventarioRepo.findByIdProductoOrderByIdAsc(8L)).thenReturn(List.of());
        assertThrows(com.sonidovivo.gestion_inventario.exception.NotFoundException.class,
                () -> service.agregar(new MovimientoRequestDTO(8L, 1, null, null)));
        when(bodegaRepo.existsByNombre("Central")).thenReturn(true);
        assertThrows(ConflictException.class, () -> service.crearBodega(" Central ", "Norte"));
    }

    @Test
    void consultaYCreacionInicialCubrenFlujosNormales() {
        Inventario inv = new Inventario();
        inv.setIdProducto(4L);
        inv.setStockActual(6);
        com.sonidovivo.gestion_inventario.model.Bodega bodega = new com.sonidovivo.gestion_inventario.model.Bodega();
        bodega.setId(2L);
        bodega.setNombre("Central");
        inv.setBodega(bodega);
        when(inventarioRepo.findAll()).thenReturn(List.of(inv));
        when(inventarioRepo.findBajoStock()).thenReturn(List.of(inv));
        when(inventarioRepo.findByIdProductoOrderByIdAsc(4L)).thenReturn(List.of(inv));
        when(movimientoRepo.findByInventarioIdOrderByFechaDesc(1L)).thenReturn(List.of());
        when(bodegaRepo.findById(2L)).thenReturn(java.util.Optional.of(bodega));
        when(inventarioRepo.findByIdProductoAndBodegaId(4L, 2L)).thenReturn(java.util.Optional.empty());
        when(inventarioRepo.save(any(Inventario.class))).thenAnswer(i -> i.getArgument(0));

        assertEquals(1, service.listar().size());
        assertEquals(1, service.bajoStock().size());
        assertEquals(6, service.stockProducto(4L).getStockTotal());
        assertEquals(0, service.movimientos(1L).size());
        assertEquals(5, service.crear(new InventarioRequestDTO(4L, 2L, 5, null)).getStockActual());
    }

    @Test
    void creaConBodegaPorDefectoYDescuentaEnVariasFilas() {
        com.sonidovivo.gestion_inventario.model.Bodega bodega = new com.sonidovivo.gestion_inventario.model.Bodega();
        bodega.setId(1L); bodega.setNombre("Central");
        when(bodegaRepo.findAll()).thenReturn(List.of(bodega));
        when(inventarioRepo.findByIdProductoAndBodegaId(3L, 1L)).thenReturn(java.util.Optional.empty());
        when(inventarioRepo.save(any(Inventario.class))).thenAnswer(i -> i.getArgument(0));
        assertEquals(0, service.crear(new InventarioRequestDTO(3L, null, 0, 1)).getStockActual());

        Inventario first = new Inventario(); first.setId(1L); first.setStockActual(1);
        Inventario second = new Inventario(); second.setId(2L); second.setStockActual(4);
        when(inventarioRepo.findByIdProductoOrderByIdAsc(3L)).thenReturn(List.of(first, second));
        assertEquals(2, service.descontar(new MovimientoRequestDTO(3L, 3, null, null)).getStockTotal());
    }
}
