package com.sonidovivo.gestion_inventario.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sonidovivo.gestion_inventario.dto.InventarioRequestDTO;
import com.sonidovivo.gestion_inventario.dto.InventarioResponseDTO;
import com.sonidovivo.gestion_inventario.dto.MovimientoRequestDTO;
import com.sonidovivo.gestion_inventario.dto.MovimientoResponseDTO;
import com.sonidovivo.gestion_inventario.dto.StockResponseDTO;
import com.sonidovivo.gestion_inventario.model.Inventario;
import com.sonidovivo.gestion_inventario.service.InventarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inventario")
@RequiredArgsConstructor
@Tag(name = "Inventario", description = "Stock por producto y movimientos")
public class InventarioController {

    private final InventarioService service;

    @GetMapping
    @Operation(summary = "Listar todo el inventario")
    public List<InventarioResponseDTO> listar() {
        return service.listar().stream().map(InventarioResponseDTO::from).toList();
    }

    @GetMapping("/producto/{idProducto}")
    @Operation(summary = "Stock total de un producto")
    public StockResponseDTO stock(@PathVariable Long idProducto) {
        return service.stockProducto(idProducto);
    }

    @GetMapping("/bajo-stock")
    @Operation(summary = "Productos con stock igual o menor al minimo")
    public List<InventarioResponseDTO> bajoStock() {
        return service.bajoStock().stream().map(InventarioResponseDTO::from).toList();
    }

    @GetMapping("/{id}/movimientos")
    @Operation(summary = "Historial de movimientos de un registro de inventario")
    public List<MovimientoResponseDTO> movimientos(@PathVariable Long id) {
        return service.movimientos(id).stream().map(MovimientoResponseDTO::from).toList();
    }

    @PostMapping
    @Operation(summary = "Crear el stock inicial de un producto")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Creado"),
            @ApiResponse(responseCode = "404", description = "El producto no existe en el catalogo"),
            @ApiResponse(responseCode = "409", description = "Ya tiene inventario en esa bodega")
    })
    public ResponseEntity<InventarioResponseDTO> crear(@Valid @RequestBody InventarioRequestDTO dto) {
        Inventario inv = service.crear(dto);
        return ResponseEntity.created(URI.create("/api/inventario/" + inv.getId()))
                .body(InventarioResponseDTO.from(inv));
    }

    @PutMapping("/agregar")
    @Operation(summary = "Entrada de stock")
    public StockResponseDTO agregar(@Valid @RequestBody MovimientoRequestDTO dto) {
        return service.agregar(dto);
    }

    @PutMapping("/descontar")
    @Operation(summary = "Salida de stock (409 si no alcanza)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Descontado"),
            @ApiResponse(responseCode = "409", description = "Stock insuficiente")
    })
    public StockResponseDTO descontar(@Valid @RequestBody MovimientoRequestDTO dto) {
        return service.descontar(dto);
    }
}
