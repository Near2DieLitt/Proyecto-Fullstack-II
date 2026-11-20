package com.sonidovivo.gestion_usuarios.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Tag(name = "Roles")
public class RolController {

    private final UsuarioService service;

    @GetMapping
    public List<Rol> listar() {
        return service.listarRoles();
    }
}
