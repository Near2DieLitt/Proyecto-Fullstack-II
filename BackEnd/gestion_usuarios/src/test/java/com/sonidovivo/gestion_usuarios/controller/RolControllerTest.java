package com.sonidovivo.gestion_usuarios.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.sonidovivo.gestion_usuarios.model.Rol;
import com.sonidovivo.gestion_usuarios.service.UsuarioService;

@ExtendWith(MockitoExtension.class)
class RolControllerTest {
    @Mock private UsuarioService service;
    @InjectMocks private RolController controller;

    @Test
    void listaRoles() {
        when(service.listarRoles()).thenReturn(List.of(new Rol()));
        assertEquals(1, controller.listar().size());
    }
}
