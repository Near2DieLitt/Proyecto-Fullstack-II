package com.sonidovivo.gestion_configuracion.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_configuracion.dto.ConfiguracionRequestDTO;
import com.sonidovivo.gestion_configuracion.dto.ValorRequestDTO;
import com.sonidovivo.gestion_configuracion.model.Configuracion;
import com.sonidovivo.gestion_configuracion.service.ConfiguracionService;

@ExtendWith(MockitoExtension.class)
class ConfiguracionControllerTest {

    @Mock
    private ConfiguracionService service;

    @InjectMocks
    private ConfiguracionController controller;

    @Test
    void delegaOperacionesAlServicio() {
        Configuracion configuracion = new Configuracion("IVA", "19", "Impuesto");
        when(service.listar()).thenReturn(List.of(configuracion));
        when(service.obtener("IVA")).thenReturn(configuracion);
        when(service.crear(any())).thenReturn(configuracion);
        when(service.actualizarValor("IVA", "20")).thenReturn(configuracion);

        assertEquals(1, controller.listar().size());
        assertEquals("IVA", controller.obtener("IVA").getClave());
        assertEquals(201, controller.crear(new ConfiguracionRequestDTO()).getStatusCode().value());
        assertEquals("IVA", controller.actualizar("IVA", new ValorRequestDTO("20")).getClave());
        assertEquals(204, controller.eliminar("IVA").getStatusCode().value());
        verify(service).eliminar("IVA");
    }
}