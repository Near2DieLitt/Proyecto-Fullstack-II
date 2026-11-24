package com.sonidovivo.gestion_pedidos.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_pedidos.dto.CambioEstadoDTO;
import com.sonidovivo.gestion_pedidos.dto.PedidoRequestDTO;
import com.sonidovivo.gestion_pedidos.model.Pedido;
import com.sonidovivo.gestion_pedidos.service.PedidoService;

@ExtendWith(MockitoExtension.class) class PedidoControllerTest{
    @Mock PedidoService service;
    @InjectMocks PedidoController controller;
    @Test void exponePedidos() {

        Pedido p=new Pedido();
        p.setId(1L);
        p.setDetalles(List.of());
        p.setSubtotal(BigDecimal.ZERO);
        p.setCostoEnvio(BigDecimal.ZERO);
        p.setTotal(BigDecimal.ZERO);
        when(service.crear(any())).thenReturn(p);
        when(service.listar(null)).thenReturn(List.of(p));
        when(service.porUsuario(2L)).thenReturn(List.of(p));
        when(service.findByIdOrThrow(1L)).thenReturn(p);
        when(service.cambiarEstado(1L,"PAGADO")).thenReturn(p);
        when(service.historial(1L)).thenReturn(List.of());
        assertEquals(201,controller.crear(new PedidoRequestDTO()).getStatusCode().value());
        assertEquals(1,controller.listar(null).size());
        assertEquals(1,controller.porUsuario(2L).size());
        assertEquals(1L,controller.obtener(1L).getId());
        assertEquals(1L,controller.cambiarEstado(1L,new CambioEstadoDTO("PAGADO")).getId());
        assertTrue(controller.historial(1L).isEmpty());

    }
}