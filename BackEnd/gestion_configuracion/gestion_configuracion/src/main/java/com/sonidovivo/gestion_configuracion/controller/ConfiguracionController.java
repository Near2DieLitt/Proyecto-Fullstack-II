package com.sonidovivo.gestion_configuracion.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_configuracion.dto.ConfiguracionRequestDTO;
import com.sonidovivo.gestion_configuracion.dto.ValorRequestDTO;
import com.sonidovivo.gestion_configuracion.model.Configuracion;
import com.sonidovivo.gestion_configuracion.service.ConfiguracionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/configuracion")
@RequiredArgsConstructor 
@Tag (name = "Configuración", description = "Parámetros de la tienda (IVA, costo de envío, etc.)")
public class ConfiguracionController {

    private final ConfiguracionService service;

    @GetMapping
    public List<Configuracion> listar() {
        return service.listar();
    }

    @GetMapping("/{clave}")
    public Configuracion obtener(@PathVariable String clave) {
        return service.obtener(clave);
    }

    @PostMapping
    public ResponseEntity<Configuracion> crear(@Valid @RequestBody ConfiguracionRequestDTO dto) {
        return ResponseEntity.status(201).body(service.crear(dto));
    }

    @PutMapping("/{clave}")
    public Configuracion actualizar(@PathVariable String clave, @Valid @RequestBody ValorRequestDTO dto) {
        return service.actualizarValor(clave, dto.getValor());
    }

    @DeleteMapping("/{clave}")
    public ResponseEntity<Void> eliminar(@PathVariable String clave) {
        service.eliminar(clave);
        return ResponseEntity.noContent().build();
    }
}
