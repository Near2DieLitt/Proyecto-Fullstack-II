package com.sonidovivo.gestion_envios.controller;


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

import com.sonidovivo.gestion_envios.dto.EnvioEstadoRequestDTO;
import com.sonidovivo.gestion_envios.dto.EnvioRequestDTO;
import com.sonidovivo.gestion_envios.dto.EnvioResponseDTO;
import com.sonidovivo.gestion_envios.model.Envio;
import com.sonidovivo.gestion_envios.model.HistorialEnvio;
import com.sonidovivo.gestion_envios.service.EnvioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/envios")
@RequiredArgsConstructor
@Tag(name = "Envios", description = "Despacho y seguimiento")
public class EnvioController {

    private final EnvioService service;

    @GetMapping
    @Operation(summary = "Listar envios (admin)")
    public List<EnvioResponseDTO> listar() {
        return service.listar().stream().map(EnvioResponseDTO::from).toList();
    }

    @PostMapping
    @Operation(summary = "Crear el envio de un pedido pagado")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Envio creado"),
            @ApiResponse(responseCode = "404", description = "El pedido no existe"),
            @ApiResponse(responseCode = "409", description = "Pedido no pagado o ya despachado")
    })
    public ResponseEntity<EnvioResponseDTO> crear(@Valid @RequestBody EnvioRequestDTO dto) {
        Envio e = service.crear(dto);
        return ResponseEntity.created(URI.create("/api/envios/" + e.getId()))
                .body(EnvioResponseDTO.from(e));
    }

    @GetMapping("/pedido/{idPedido}")
    @Operation(summary = "Seguimiento de un pedido")
    public EnvioResponseDTO porPedido(@PathVariable Long idPedido) {
        return EnvioResponseDTO.from(service.porPedido(idPedido));
    }

    @GetMapping("/seguimiento/{codigo}")
    @Operation(summary = "Buscar por codigo de seguimiento")
    public EnvioResponseDTO porCodigo(@PathVariable String codigo) {
        return EnvioResponseDTO.from(service.porCodigo(codigo));
    }

    @PutMapping("/{id}/estado")
    @Operation(summary = "Avanzar el estado (PREPARANDO -> EN_CAMINO -> ENTREGADO)")
    public EnvioResponseDTO estado(@PathVariable Long id, @Valid @RequestBody EnvioEstadoRequestDTO dto) {
        return EnvioResponseDTO.from(service.cambiarEstado(id, dto.getEstado(), dto.getDetalle()));
    }

    @GetMapping("/{id}/historial")
    @Operation(summary = "Linea de tiempo del envio")
    public List<HistorialEnvio> historial(@PathVariable Long id) {
        return service.historial(id);
    }
}

