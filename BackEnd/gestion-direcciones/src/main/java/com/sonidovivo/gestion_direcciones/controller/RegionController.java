package com.sonidovivo.gestion_direcciones.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_direcciones.model.Comuna;
import com.sonidovivo.gestion_direcciones.model.Region;
import com.sonidovivo.gestion_direcciones.service.DireccionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/regiones")
@RequiredArgsConstructor
@Tag(name = "Regiones y comunas")
public class RegionController {

    private final DireccionService service;

    @GetMapping
    @Operation(summary = "Listar regiones")
    public List<Region> regiones() {
        return service.listarRegiones();
    }

    @GetMapping("/{id}/comunas")
    @Operation(summary = "Listar comunas de una region")
    public List<Comuna> comunas(@PathVariable Long id) {
        return service.listarComunas(id);
    }
}
