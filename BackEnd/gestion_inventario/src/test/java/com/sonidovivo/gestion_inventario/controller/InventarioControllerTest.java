package com.sonidovivo.gestion_inventario.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sonidovivo.gestion_inventario.model.Inventario;
import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.service.InventarioService;
import com.sonidovivo.gestion_inventario.dto.StockResponseDTO;
import com.sonidovivo.gestion_inventario.dto.MovimientoRequestDTO;

@ExtendWith(MockitoExtension.class)
class InventarioControllerTest {
    @Mock private InventarioService service;
    @InjectMocks private InventarioController controller;

    @Test
    void listarMapeaInventariosARespuestas() {
        Bodega bodega = new Bodega();
        bodega.setId(2L);
        bodega.setNombre("Central");
        Inventario inventario = new Inventario();
        inventario.setId(1L);
        inventario.setIdProducto(8L);
        inventario.setBodega(bodega);
        inventario.setStockActual(5);
        inventario.setStockMinimo(2);
        when(service.listar()).thenReturn(List.of(inventario));

        var result = controller.listar();

        assertEquals(1, result.size());
        assertEquals(8L, result.get(0).getIdProducto());
        assertEquals(5, result.get(0).getStockActual());
    }

    @Test
    void consultaMovimientosYOperacionesDeStock() {
        Inventario inventario = new Inventario();
        inventario.setId(1L);
        inventario.setIdProducto(8L);
        Bodega bodega = new Bodega();
        bodega.setId(2L);
        bodega.setNombre("Central");
        inventario.setBodega(bodega);
        when(service.stockProducto(8L)).thenReturn(new StockResponseDTO(8L, 5));
        when(service.bajoStock()).thenReturn(List.of(inventario));
        when(service.movimientos(1L)).thenReturn(List.of());
        when(service.agregar(new MovimientoRequestDTO(8L, 1, null, null))).thenReturn(new StockResponseDTO(8L, 6));
        when(service.descontar(new MovimientoRequestDTO(8L, 1, null, null))).thenReturn(new StockResponseDTO(8L, 4));

        assertEquals(5, controller.stock(8L).getStockTotal());
        assertEquals(1, controller.bajoStock().size());
        assertEquals(0, controller.movimientos(1L).size());
        assertEquals(6, controller.agregar(new MovimientoRequestDTO(8L, 1, null, null)).getStockTotal());
        assertEquals(4, controller.descontar(new MovimientoRequestDTO(8L, 1, null, null)).getStockTotal());
    }
}
