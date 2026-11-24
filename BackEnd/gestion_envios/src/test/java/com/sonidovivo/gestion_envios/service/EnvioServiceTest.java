package com.sonidovivo.gestion_envios.service;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_envios.client.DireccionClient;
import com.sonidovivo.gestion_envios.client.PedidoClient;
import com.sonidovivo.gestion_envios.client.PedidoDTO;
import com.sonidovivo.gestion_envios.dto.EnvioRequestDTO;
import com.sonidovivo.gestion_envios.exception.ConflictException;
import com.sonidovivo.gestion_envios.exception.NotFoundException;
import com.sonidovivo.gestion_envios.model.Envio;
import com.sonidovivo.gestion_envios.repository.EnvioRepository;
import com.sonidovivo.gestion_envios.repository.HistorialEnvioRepository;



@ExtendWith(MockitoExtension.class) class EnvioServiceTest {
    @Mock EnvioRepository envioRepo;
    @Mock HistorialEnvioRepository historialRepo;
    @Mock PedidoClient pedidoClient;
    @Mock DireccionClient direccionClient;
    @InjectMocks EnvioService service;

    @Test void creaConsultaYCambiaEstado() {

        PedidoDTO pedido=new PedidoDTO(8L,1L,2L,"PAGADO");
        Envio e=new Envio();
        e.setId(1L);
        e.setIdPedido(8L);
        e.setEstado("PREPARANDO");
        when(pedidoClient.obtenerPedido(8L)).thenReturn(pedido);
        when(envioRepo.existsByIdPedido(8L)).thenReturn(false);
        when(envioRepo.existsByCodigoSeguimiento(any())).thenReturn(false);
        when(envioRepo.save(any())).thenAnswer(i->{
            Envio v=i.getArgument(0);
            if(v.getId()==null)v.setId(1L);
            return v;

        });
        when(envioRepo.findAll()).thenReturn(List.of(e));
        when(envioRepo.findById(1L)).thenReturn(Optional.of(e));
        when(envioRepo.findByIdPedido(8L)).thenReturn(Optional.of(e));
        when(envioRepo.findByCodigoSeguimiento("SV-1")).thenReturn(Optional.of(e));
        when(historialRepo.findByIdEnvioOrderByFechaAsc(1L)).thenReturn(List.of());
        assertEquals("PREPARANDO",service.crear(new EnvioRequestDTO(8L," Chilexpress ",LocalDate.now())).getEstado());
        assertEquals(1,service.listar().size());
        assertEquals(e,service.porPedido(8L));
        assertEquals(e,service.porCodigo(" sv-1 "));
        assertEquals(0,service.historial(1L).size());
        assertEquals("EN_CAMINO",service.cambiarEstado(1L,"EN_CAMINO","sale").getEstado());

    }
    @Test void rechazaEstadoYNoEncontrados() {

        Envio e=new Envio();
        e.setEstado("PREPARANDO");
        when(envioRepo.findById(1L)).thenReturn(Optional.of(e));
        assertThrows(ConflictException.class,()->service.cambiarEstado(1L,"ENTREGADO",null));
        when(envioRepo.findById(2L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class,()->service.findByIdOrThrow(2L));

    }
}