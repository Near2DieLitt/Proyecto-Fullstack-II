package com.sonidovivo.gestion_mensajeria.service;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_mensajeria.dto.ContactoRequestDTO;
import com.sonidovivo.gestion_mensajeria.exception.NotFoundException;
import com.sonidovivo.gestion_mensajeria.model.Mensajeria;
import com.sonidovivo.gestion_mensajeria.repository.MensajeriaRepository;

@ExtendWith(MockitoExtension.class) class MensajeriaServiceTest {
    @Mock MensajeriaRepository repository;
    @InjectMocks MensajeriaService service;

    @Test void guardaListaActualizaYResponde() {

        Mensajeria m=new Mensajeria();
        m.setId(1L);
        when(repository.save(any())).thenAnswer(i->i.getArgument(0));
        when(repository.findAll()).thenReturn(List.of(m));
        when(repository.findByEstado("PENDIENTE")).thenReturn(List.of(m));
        when(repository.findById(1L)).thenReturn(Optional.of(m));
        assertEquals("PENDIENTE",service.guardar(new ContactoRequestDTO(" Ana "," a@b.cl "," hola ")).getEstado());
        assertEquals(1,service.listar(null).size());
        assertEquals(1,service.listar("pendiente").size());
        assertEquals("LEIDO",service.cambiarEstado(1L,"LEIDO").getEstado());
        assertEquals("RESPONDIDO",service.responder(1L," ok ").getEstado());
        assertNotNull(m.getFechaRespuesta());

    }
    @Test void ausenteFalla() {

        when(repository.findById(2L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class,()->service.findByIdOrThrow(2L));

    }
}