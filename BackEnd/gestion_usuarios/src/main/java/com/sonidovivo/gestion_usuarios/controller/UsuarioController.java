package com.sonidovivo.gestion_usuarios.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.sonidovivo.gestion_usuarios.dto.ActivoRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.UsuarioRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.UsuarioResponseDTO;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Gestion de usuarios")
public class UsuarioController {

    private final UsuarioService service;

    @GetMapping
    @Operation(summary = "Listar usuarios")
    public List<UsuarioResponseDTO> listar() {
        return service.listar().stream().map(UsuarioResponseDTO::from).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un usuario por id")
    public UsuarioResponseDTO obtener(@PathVariable Long id) {
        return UsuarioResponseDTO.from(service.findByIdOrThrow(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar nombre y telefono")
    public UsuarioResponseDTO actualizar(@PathVariable Long id, @Valid @RequestBody UsuarioRequestDTO dto) {
        return UsuarioResponseDTO.from(service.actualizar(id, dto));
    }

    @PutMapping("/{id}/activo")
    @Operation(summary = "Activar o desactivar una cuenta")
    public UsuarioResponseDTO activo(@PathVariable Long id, @Valid @RequestBody ActivoRequestDTO dto) {
        return UsuarioResponseDTO.from(service.cambiarActivo(id, dto.getActivo()));
    }
}

