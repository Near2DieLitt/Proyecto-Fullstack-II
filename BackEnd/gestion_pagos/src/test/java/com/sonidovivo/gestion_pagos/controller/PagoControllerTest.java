package com.sonidovivo.gestion_pagos.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_pagos.dto.PagoRequestDTO;
import com.sonidovivo.gestion_pagos.model.MetodoPago;
import com.sonidovivo.gestion_pagos.model.Pago;
import com.sonidovivo.gestion_pagos.service.PagoService;

@ExtendWith(MockitoExtension.class) class PagoControllerTest{
    @Mock PagoService service;
    @InjectMocks PagoController controller;
    @InjectMocks MetodoPagoController metodos;
    @Test void exponePagosYMetodos() {

        MetodoPago metodo=new MetodoPago();
        Pago p=new Pago();
        p.setId(1L);
        p.setIdPedido(2L);
        p.setMonto(BigDecimal.TEN);
        p.setMetodoPago(metodo);
        when(service.pagar(any())).thenReturn(p);
        when(service.porPedido(2L)).thenReturn(List.of(p));
        when(service.findByIdOrThrow(1L)).thenReturn(p);
        when(service.metodosActivos()).thenReturn(List.of(metodo));
        assertEquals(201,controller.pagar(new PagoRequestDTO()).getStatusCode().value());
        assertEquals(1,controller.porPedido(2L).size());
        assertEquals(1L,controller.obtener(1L).getId());
        assertEquals(1,metodos.listar().size());

    }
}