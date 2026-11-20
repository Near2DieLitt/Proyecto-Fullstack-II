package com.sonidovivo.gestion_usuarios.controller;


import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_usuarios.dto.LoginRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.RegistroRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.UsuarioResponseDTO;
import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticacion", description = "Registro e inicio de sesion")
public class AuthController {

    private final UsuarioService service;

    @PostMapping("/registro")
    @Operation(summary = "Registrar un cliente nuevo")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuario creado"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "409", description = "El correo ya existe")
    })
    public ResponseEntity<UsuarioResponseDTO> registro(@Valid @RequestBody RegistroRequestDTO dto) {
        Usuario u = service.registrar(dto);
        return ResponseEntity.created(URI.create("/api/usuarios/" + u.getId()))
                .body(UsuarioResponseDTO.from(u));
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesion")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Credenciales correctas"),
            @ApiResponse(responseCode = "401", description = "Correo o contraseña incorrectos")
    })
    public UsuarioResponseDTO login(@Valid @RequestBody LoginRequestDTO dto) {
        return UsuarioResponseDTO.from(service.login(dto));
    }
}
