package com.sonidovivo.gestion_pedidos.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import com.sonidovivo.gestion_pedidos.client.CatalogoClient;
import com.sonidovivo.gestion_pedidos.client.DireccionClient;
import com.sonidovivo.gestion_pedidos.client.DireccionDTO;
import com.sonidovivo.gestion_pedidos.client.InventarioClient;
import com.sonidovivo.gestion_pedidos.client.ProductoDTO;
import com.sonidovivo.gestion_pedidos.client.UsuarioClient;
import com.sonidovivo.gestion_pedidos.dto.ItemRequestDTO;
import com.sonidovivo.gestion_pedidos.dto.PedidoRequestDTO;
import com.sonidovivo.gestion_pedidos.exception.ConflictException;
import com.sonidovivo.gestion_pedidos.exception.NotFoundException;
import com.sonidovivo.gestion_pedidos.model.DetallePedido;
import com.sonidovivo.gestion_pedidos.model.HistorialEstadoPedido;
import com.sonidovivo.gestion_pedidos.model.Pedido;
import com.sonidovivo.gestion_pedidos.repository.HistorialEstadoPedidoRepository;
import com.sonidovivo.gestion_pedidos.repository.PedidoRepository;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private HistorialEstadoPedidoRepository historialRepository;

    @Mock
    private UsuarioClient usuarioClient;

    @Mock
    private DireccionClient direccionClient;

    @Mock
    private CatalogoClient catalogoClient;

    @Mock
    private InventarioClient inventarioClient;

    @InjectMocks
    private PedidoService service;

    @BeforeEach
    void configurarCostos() {
        ReflectionTestUtils.setField(service, "costoEnvioEstandar", BigDecimal.valueOf(3990));
        ReflectionTestUtils.setField(service, "envioGratisDesde", BigDecimal.valueOf(100000));
    }

    @Test
    void creaPedidoConEnvioYLoMarcaComoPagado() {
        when(direccionClient.obtenerDireccion(2L)).thenReturn(new DireccionDTO(2L, 1L));
        when(catalogoClient.obtenerProducto(3L))
                .thenReturn(new ProductoDTO(3L, "Guitarra", BigDecimal.TEN));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> {
            Pedido pedido = invocation.getArgument(0);
            pedido.setId(9L);
            return pedido;
        });

        Pedido pedido = service.crear(new PedidoRequestDTO(1L, 2L,
                List.of(new ItemRequestDTO(3L, 2))));

        assertEquals(BigDecimal.valueOf(4010), pedido.getTotal());
        verify(inventarioClient).descontar(any());
        when(pedidoRepository.findById(9L)).thenReturn(Optional.of(pedido));
        assertEquals("PAGADO", service.cambiarEstado(9L, "PAGADO").getEstado());
    }

    @Test
    void aplicaEnvioGratisYListaPedidos() {
        when(direccionClient.obtenerDireccion(2L)).thenReturn(new DireccionDTO(2L, 1L));
        when(catalogoClient.obtenerProducto(3L))
                .thenReturn(new ProductoDTO(3L, "Equipo", BigDecimal.valueOf(100000)));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> {
            Pedido pedido = invocation.getArgument(0);
            pedido.setId(10L);
            return pedido;
        });

        Pedido pedido = service.crear(new PedidoRequestDTO(1L, 2L,
                List.of(new ItemRequestDTO(3L, 1))));

        assertEquals(BigDecimal.ZERO, pedido.getCostoEnvio());
        when(pedidoRepository.findAll()).thenReturn(List.of(pedido));
        when(pedidoRepository.findByEstadoOrderByFechaCreacionDesc("PAGADO"))
                .thenReturn(List.of(pedido));
        when(pedidoRepository.findByIdUsuarioOrderByFechaCreacionDesc(1L))
                .thenReturn(List.of(pedido));
        assertEquals(1, service.listar(null).size());
        assertEquals(1, service.listar("pagado").size());
        assertEquals(1, service.porUsuario(1L).size());
    }

    @Test
    void cancelaPedidoYDevuelveStock() {
        Pedido pedido = pedidoConDetalle("CREADO");
        when(pedidoRepository.findById(4L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));

        assertEquals("CANCELADO", service.cambiarEstado(4L, "CANCELADO").getEstado());
        verify(inventarioClient).agregar(any());
        verify(historialRepository).save(any(HistorialEstadoPedido.class));
    }

    @Test
    void rechazaTransicionInvalidaYConsultaHistorial() {
        Pedido pedido = pedidoConDetalle("CREADO");
        when(pedidoRepository.findById(4L)).thenReturn(Optional.of(pedido));
        when(historialRepository.findByIdPedidoOrderByFechaAsc(4L))
                .thenReturn(List.of(new HistorialEstadoPedido()));

        assertThrows(ConflictException.class, () -> service.cambiarEstado(4L, "ENTREGADO"));
        assertEquals(1, service.historial(4L).size());
    }

    @Test
    void compensaStockSiFallaUnDescuento() {
        when(direccionClient.obtenerDireccion(2L)).thenReturn(new DireccionDTO(2L, 1L));
        when(catalogoClient.obtenerProducto(3L))
                .thenReturn(new ProductoDTO(3L, "Producto", BigDecimal.TEN));
        when(catalogoClient.obtenerProducto(5L))
                .thenReturn(new ProductoDTO(5L, "Otro", BigDecimal.ONE));
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> {
            Pedido pedido = invocation.getArgument(0);
            pedido.setId(11L);
            return pedido;
        });
        doThrow(new ConflictException("sin stock"))
                .when(inventarioClient).descontar(any());

        assertThrows(ConflictException.class, () -> service.crear(new PedidoRequestDTO(1L, 2L,
                List.of(new ItemRequestDTO(3L, 1), new ItemRequestDTO(5L, 1)))));
    }

    @Test
    void fallaCuandoDireccionNoPerteneceAlUsuarioOPedidoNoExiste() {
        when(direccionClient.obtenerDireccion(2L)).thenReturn(new DireccionDTO(2L, 5L));

        assertThrows(ConflictException.class, () -> service.crear(new PedidoRequestDTO(1L, 2L,
                List.of(new ItemRequestDTO(3L, 1)))));
        when(pedidoRepository.findById(8L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> service.findByIdOrThrow(8L));
    }

    private Pedido pedidoConDetalle(String estado) {
        Pedido pedido = new Pedido();
        pedido.setId(4L);
        pedido.setEstado(estado);
        pedido.setDetalles(new ArrayList<>());
        DetallePedido detalle = new DetallePedido();
        detalle.setIdProducto(3L);
        detalle.setCantidad(1);
        detalle.setPedido(pedido);
        pedido.getDetalles().add(detalle);
        return pedido;
    }
}
