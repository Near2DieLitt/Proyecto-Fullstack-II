package com.sonidovivo.gestion_mensajeria.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_mensajeria.dto.ContactoRequestDTO;
import com.sonidovivo.gestion_mensajeria.dto.EstadoRequestDTO;
import com.sonidovivo.gestion_mensajeria.dto.RespuestaRequestDTO;
import com.sonidovivo.gestion_mensajeria.model.Mensajeria;
import com.sonidovivo.gestion_mensajeria.service.MensajeriaService;

@ExtendWith(MockitoExtension.class) class MensajeriaControllerTest {
    @Mock MensajeriaService service;
    @InjectMocks MensajeriaController controller;
    @Test void delegaTodasLasRutas() {

        Mensajeria m=new Mensajeria();
        m.setId(3L);
        when(service.guardar(any())).thenReturn(m);
        when(service.listar(null)).thenReturn(List.of(m));
        when(service.findByIdOrThrow(3L)).thenReturn(m);
        when(service.cambiarEstado(3L,"LEIDO")).thenReturn(m);
        when(service.responder(3L,"ok")).thenReturn(m);
        assertEquals(201,controller.guardar(new ContactoRequestDTO()).getStatusCode().value());
        assertEquals(1,controller.listar(null).size());
        assertEquals(3L,controller.obtener(3L).getId());
        assertEquals(3L,controller.estado(3L,new EstadoRequestDTO("LEIDO")).getId());
        assertEquals(3L,controller.responder(3L,new RespuestaRequestDTO("ok")).getId());

    }
}