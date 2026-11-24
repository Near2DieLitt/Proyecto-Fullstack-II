package com.sonidovivo.gestion_envios.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_envios.dto.EnvioEstadoRequestDTO;
import com.sonidovivo.gestion_envios.dto.EnvioRequestDTO;
import com.sonidovivo.gestion_envios.model.Envio;
import com.sonidovivo.gestion_envios.service.EnvioService;

@ExtendWith(MockitoExtension.class) class EnvioControllerTest {
    @Mock EnvioService service;
    @InjectMocks EnvioController controller;
    @Test void delegaOperaciones() {

        Envio e=new Envio();
        e.setId(1L);
        e.setEstado("PREPARANDO");
        when(service.listar()).thenReturn(List.of(e));
        when(service.crear(any())).thenReturn(e);
        when(service.porPedido(2L)).thenReturn(e);
        when(service.porCodigo("SV")).thenReturn(e);
        when(service.cambiarEstado(1L,"EN_CAMINO","x")).thenReturn(e);
        when(service.historial(1L)).thenReturn(List.of());
        assertEquals(1,controller.listar().size());
        assertEquals(201,controller.crear(new EnvioRequestDTO()).getStatusCode().value());
        assertEquals(1L,controller.porPedido(2L).getId());
        assertEquals(1L,controller.porCodigo("SV").getId());
        assertEquals(1L,controller.estado(1L,new EnvioEstadoRequestDTO("EN_CAMINO","x")).getId());
        assertTrue(controller.historial(1L).isEmpty());

    }
}