package com.sonidovivo.gestion_usuarios.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_usuarios.dto.LoginRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.RegistroRequestDTO;
import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {
    @Mock private UsuarioService service;
    @InjectMocks private AuthController controller;

    @Test
    void registroYLoginDevuelvenUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(2L);
        usuario.setNombre("Ana");
        usuario.setCorreo("ana@correo.cl");
        usuario.setActivo(true);
        Rol rol = new Rol();
        rol.setNombre("CLIENTE");
        usuario.setRol(rol);
        RegistroRequestDTO registro = new RegistroRequestDTO("Ana", "ana@correo.cl", "secreto1", null);
        when(service.registrar(registro)).thenReturn(usuario);
        when(service.login(new LoginRequestDTO("ana@correo.cl", "secreto1"))).thenReturn(usuario);

        assertEquals(201, controller.registro(registro).getStatusCode().value());
        assertEquals("ana@correo.cl", controller.login(new LoginRequestDTO("ana@correo.cl", "secreto1")).getCorreo());
    }
}
