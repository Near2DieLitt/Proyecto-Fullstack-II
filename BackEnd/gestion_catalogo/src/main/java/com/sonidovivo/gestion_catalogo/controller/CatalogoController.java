package com.sonidovivo.gestion_catalogo.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_catalogo.dto.NombreRequestDTO;
import com.sonidovivo.gestion_catalogo.dto.ProductoRequestDTO;
import com.sonidovivo.gestion_catalogo.dto.ProductoResponseDTO;
import com.sonidovivo.gestion_catalogo.model.Categoria;
import com.sonidovivo.gestion_catalogo.model.Marca;
import com.sonidovivo.gestion_catalogo.service.CatalogoBaseService;
import com.sonidovivo.gestion_catalogo.service.ProductoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CatalogoController {

    private final ProductoService productoService;
    private final CatalogoBaseService catalogoBaseService;

    @GetMapping("/productos")
    public List<ProductoResponseDTO> listarProductos(
            @RequestParam(required = false) Long categoria,
            @RequestParam(required = false) Long marca,
            @RequestParam(required = false) BigDecimal min,
            @RequestParam(required = false) BigDecimal max,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Boolean destacado) {
        return productoService.listar(categoria, marca, min, max, q, destacado)
                .stream().map(ProductoResponseDTO::from).toList();
    }

    @GetMapping("/productos/{id}")
    public ProductoResponseDTO obtenerProducto(@PathVariable Long id) {
        return ProductoResponseDTO.from(productoService.findByIdOrThrow(id));
    }

    @PostMapping("/productos")
    public ResponseEntity<ProductoResponseDTO> crearProducto(@Valid @RequestBody ProductoRequestDTO request) {
        var producto = productoService.crear(request);
        return ResponseEntity.status(201).body(ProductoResponseDTO.from(producto));
    }

    @PutMapping("/productos/{id}")
    public ProductoResponseDTO actualizarProducto(@PathVariable Long id,
            @Valid @RequestBody ProductoRequestDTO request) {
        return ProductoResponseDTO.from(productoService.actualizar(id, request));
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categorias")
    public List<Categoria> listarCategorias() {
        return catalogoBaseService.categorias();
    }

    @PostMapping("/categorias")
    public Categoria crearCategoria(@Valid @RequestBody NombreRequestDTO request) {
        return catalogoBaseService.crearCategoria(request.getNombre());
    }

    @GetMapping("/marcas")
    public List<Marca> listarMarcas() {
        return catalogoBaseService.marcas();
    }

    @PostMapping("/marcas")
    public Marca crearMarca(@Valid @RequestBody NombreRequestDTO request) {
        return catalogoBaseService.crearMarca(request.getNombre());
    }
}
