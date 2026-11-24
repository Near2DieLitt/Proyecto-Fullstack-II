package com.sonidovivo.gestion_inventario.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.service.InventarioService;

@ExtendWith(MockitoExtension.class)
class BodegaControllerTest {
    @Mock private InventarioService service;
    @InjectMocks private BodegaController controller;

    @Test
    void listaYCreacionDeBodega() {
        Bodega bodega = new Bodega();
        bodega.setId(1L);
        bodega.setNombre("Central");
        when(service.bodegas()).thenReturn(List.of(bodega));
        when(service.crearBodega("Central", "Norte")).thenReturn(bodega);

        assertEquals(1, controller.listar().size());
        assertEquals(201, controller.crear(new com.sonidovivo.gestion_inventario.dto.BodegaRequestDTO("Central", "Norte"))
                .getStatusCode().value());
    }
}
