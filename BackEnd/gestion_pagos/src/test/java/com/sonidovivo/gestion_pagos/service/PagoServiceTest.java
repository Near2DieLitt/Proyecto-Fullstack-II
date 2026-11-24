package com.sonidovivo.gestion_pagos.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_pagos.client.PedidoClient;
import com.sonidovivo.gestion_pagos.client.PedidoDTO;
import com.sonidovivo.gestion_pagos.dto.PagoRequestDTO;
import com.sonidovivo.gestion_pagos.exception.ConflictException;
import com.sonidovivo.gestion_pagos.exception.NotFoundException;
import com.sonidovivo.gestion_pagos.model.MetodoPago;
import com.sonidovivo.gestion_pagos.model.Pago;
import com.sonidovivo.gestion_pagos.repository.MetodoPagoRepository;
import com.sonidovivo.gestion_pagos.repository.PagoRepository;

@ExtendWith(MockitoExtension.class) class PagoServiceTest{
    @Mock PagoRepository pagoRepo;
    @Mock MetodoPagoRepository metodoRepo;
    @Mock PedidoClient pedidoClient;
    @InjectMocks PagoService service;
    @Test void apruebaRechazaYConsulta() {

        MetodoPago metodo=new MetodoPago();
        metodo.setActivo(true);
        metodo.setNombre("Visa");
        PedidoDTO pedido=new PedidoDTO(1L,2L,BigDecimal.TEN,"CREADO");
        when(pedidoClient.obtenerPedido(1L)).thenReturn(pedido);
        when(pagoRepo.existsByIdPedidoAndEstado(1L,"APROBADO")).thenReturn(false);
        when(metodoRepo.findById(2L)).thenReturn(Optional.of(metodo));
        when(pagoRepo.save(any())).thenAnswer(i->i.getArgument(0));
        when(metodoRepo.findByActivoTrue()).thenReturn(List.of(metodo));
        when(pagoRepo.findByIdPedidoOrderByFechaDesc(1L)).thenReturn(List.of());
        Pago aprobado=service.pagar(new PagoRequestDTO(1L,2L,"123456789012"));
        assertEquals("APROBADO",aprobado.getEstado());
        verify(pedidoClient).cambiarEstado(eq(1L),any());
        assertEquals("RECHAZADO",service.pagar(new PagoRequestDTO(1L,2L,"123456780000")).getEstado());
        assertEquals(1,service.metodosActivos().size());
        assertTrue(service.porPedido(1L).isEmpty());

    }@Test void validaPedidoYPagoAusente() {

        when(pedidoClient.obtenerPedido(1L)).thenReturn(new PedidoDTO(1L,1L,BigDecimal.ONE,"PAGADO"));
        assertThrows(ConflictException.class,()->service.pagar(new PagoRequestDTO(1L,1L,null)));
        when(pagoRepo.findById(9L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class,()->service.findByIdOrThrow(9L));

    }
}