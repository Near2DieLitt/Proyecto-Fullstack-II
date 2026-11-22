package com.sonidovivo.gestion_pagos.controller;


import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_pagos.dto.PagoRequestDTO;
import com.sonidovivo.gestion_pagos.dto.PagoResponseDTO;
import com.sonidovivo.gestion_pagos.model.Pago;
import com.sonidovivo.gestion_pagos.service.PagoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
@Tag(name = "Pagos", description = "Cobro simulado de pedidos")
public class PagoController {

    private final PagoService service;

    @PostMapping
    @Operation(summary = "Pagar un pedido (revisar el campo estado: APROBADO o RECHAZADO)")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Pago registrado"),
            @ApiResponse(responseCode = "404", description = "Pedido o metodo no existe"),
            @ApiResponse(responseCode = "409", description = "El pedido no esta pendiente de pago")
    })
    public ResponseEntity<PagoResponseDTO> pagar(@Valid @RequestBody PagoRequestDTO dto) {
        Pago p = service.pagar(dto);
        return ResponseEntity.created(URI.create("/api/pagos/" + p.getId()))
                .body(PagoResponseDTO.from(p));
    }

    @GetMapping("/pedido/{idPedido}")
    @Operation(summary = "Pagos de un pedido")
    public List<PagoResponseDTO> porPedido(@PathVariable Long idPedido) {
        return service.porPedido(idPedido).stream().map(PagoResponseDTO::from).toList();
    }

    @GetMapping("/{id}")
    public PagoResponseDTO obtener(@PathVariable Long id) {
        return PagoResponseDTO.from(service.findByIdOrThrow(id));
    }
}

