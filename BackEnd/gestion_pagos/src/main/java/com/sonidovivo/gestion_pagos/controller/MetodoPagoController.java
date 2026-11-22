package com.sonidovivo.gestion_pagos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_pagos.model.MetodoPago;
import com.sonidovivo.gestion_pagos.service.PagoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/metodos-pago")
@RequiredArgsConstructor
@Tag(name = "Metodos de pago")
public class MetodoPagoController {

    private final PagoService service;

    @GetMapping
    @Operation(summary = "Metodos de pago disponibles")
    public List<MetodoPago> listar() {
        return service.metodosActivos();
    }
}
