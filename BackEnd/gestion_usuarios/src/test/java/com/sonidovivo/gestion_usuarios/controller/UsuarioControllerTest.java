package com.sonidovivo.gestion_usuarios.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_usuarios.model.Usuario;
import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;
import com.sonidovivo.gestion_usuarios.dto.UsuarioRequestDTO;
import com.sonidovivo.gestion_usuarios.dto.ActivoRequestDTO;

@ExtendWith(MockitoExtension.class)
class UsuarioControllerTest {
    @Mock private UsuarioService service;
    @InjectMocks private UsuarioController controller;

    @Test
    void listarConvierteUsuariosARespuestas() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Ana");
        usuario.setCorreo("ana@correo.cl");
        usuario.setActivo(true);
        Rol rol = new Rol();
        rol.setNombre("CLIENTE");
        usuario.setRol(rol);
        when(service.listar()).thenReturn(List.of(usuario));

        var respuesta = controller.listar();

        assertEquals(1, respuesta.size());
        assertEquals("ana@correo.cl", respuesta.get(0).getCorreo());
    }

    @Test
    void obtenerActualizarYActivoDeleganAlServicio() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Ana");
        usuario.setCorreo("ana@correo.cl");
        usuario.setActivo(true);
        var rol = new com.sonidovivo.gestion_usuarios.model.Rol();
        rol.setNombre("CLIENTE");
        usuario.setRol(rol);
        when(service.findByIdOrThrow(1L)).thenReturn(usuario);
        when(service.actualizar(1L, new UsuarioRequestDTO("Ana", "1"))).thenReturn(usuario);
        when(service.cambiarActivo(1L, false)).thenReturn(usuario);

        assertEquals(1L, controller.obtener(1L).getId());
        assertEquals(1L, controller.actualizar(1L, new UsuarioRequestDTO("Ana", "1")).getId());
        assertEquals(1L, controller.activo(1L, new ActivoRequestDTO(false)).getId());
    }
}
