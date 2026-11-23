package com.sonidovivo.gestion_pedidos.controller;
import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_pedidos.dto.CambioEstadoDTO;
import com.sonidovivo.gestion_pedidos.dto.PedidoRequestDTO;
import com.sonidovivo.gestion_pedidos.dto.PedidoResponseDTO;
import com.sonidovivo.gestion_pedidos.model.HistorialEstadoPedido;
import com.sonidovivo.gestion_pedidos.model.Pedido;
import com.sonidovivo.gestion_pedidos.service.PedidoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Checkout y seguimiento de pedidos")
public class PedidoController {

    private final PedidoService service;

    @PostMapping
    @Operation(summary = "Crear un pedido (checkout)")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Pedido creado"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Usuario, direccion o producto no existe"),
            @ApiResponse(responseCode = "409", description = "Sin stock suficiente")
    })
    public ResponseEntity<PedidoResponseDTO> crear(@Valid @RequestBody PedidoRequestDTO dto) {
        Pedido p = service.crear(dto);
        return ResponseEntity.created(URI.create("/api/pedidos/" + p.getId()))
                .body(PedidoResponseDTO.from(p));
    }

    @GetMapping
    @Operation(summary = "Listar pedidos (opcional: ?estado=PAGADO)")
    public List<PedidoResponseDTO> listar(@RequestParam(required = false) String estado) {
        return service.listar(estado).stream().map(PedidoResponseDTO::from).toList();
    }

    @GetMapping("/usuario/{idUsuario}")
    @Operation(summary = "Pedidos de un usuario")
    public List<PedidoResponseDTO> porUsuario(@PathVariable Long idUsuario) {
        return service.porUsuario(idUsuario).stream().map(PedidoResponseDTO::from).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalle de un pedido")
    public PedidoResponseDTO obtener(@PathVariable Long id) {
        return PedidoResponseDTO.from(service.findByIdOrThrow(id));
    }

    @PutMapping("/{id}/estado")
    @Operation(summary = "Cambiar el estado de un pedido")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Estado cambiado"),
            @ApiResponse(responseCode = "409", description = "Transicion no permitida")
    })
    public PedidoResponseDTO cambiarEstado(@PathVariable Long id, @Valid @RequestBody CambioEstadoDTO dto) {
        return PedidoResponseDTO.from(service.cambiarEstado(id, dto.getEstado()));
    }

    @GetMapping("/{id}/historial")
    @Operation(summary = "Linea de tiempo de estados")
    public List<HistorialEstadoPedido> historial(@PathVariable Long id) {
        return service.historial(id);
    }
}
