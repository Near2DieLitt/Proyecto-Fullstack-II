package com.sonidovivo.gestion_inventario.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sonidovivo.gestion_inventario.dto.BodegaRequestDTO;
import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.service.InventarioService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bodegas")
@RequiredArgsConstructor
@Tag(name = "Bodegas")
public class BodegaController {

    private final InventarioService service;

    @GetMapping
    public List<Bodega> listar() {
        return service.bodegas();
    }

    @PostMapping
    public ResponseEntity<Bodega> crear(@Valid @RequestBody BodegaRequestDTO dto) {
        return ResponseEntity.status(201).body(service.crearBodega(dto.getNombre(), dto.getUbicacion()));
    }
}
