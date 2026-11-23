package com.sonidovivo.gestion_pedidos.service;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonidovivo.gestion_pedidos.client.CatalogoClient;
import com.sonidovivo.gestion_pedidos.client.DescuentoStockDTO;
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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PedidoService {

    private static final Map<String, Set<String>> TRANSICIONES = Map.of(
            "CREADO", Set.of("PAGADO", "CANCELADO"),
            "PAGADO", Set.of("DESPACHADO"),
            "DESPACHADO", Set.of("ENTREGADO"),
            "ENTREGADO", Set.of(),
            "CANCELADO", Set.of());

    private final PedidoRepository pedidoRepo;
    private final HistorialEstadoPedidoRepository historialRepo;
    private final UsuarioClient usuarioClient;
    private final DireccionClient direccionClient;
    private final CatalogoClient catalogoClient;
    private final InventarioClient inventarioClient;

    @Value("${tienda.costo-envio:3990}")
    private BigDecimal costoEnvioEstandar;

    @Value("${tienda.envio-gratis-desde:100000}")
    private BigDecimal envioGratisDesde;

    @Transactional
    public Pedido crear(PedidoRequestDTO req) {
        usuarioClient.obtenerUsuario(req.getIdUsuario());
        DireccionDTO dir = direccionClient.obtenerDireccion(req.getIdDireccion());
        if (!req.getIdUsuario().equals(dir.getIdUsuario())) {
            throw new ConflictException("La dirección no pertenece al usuario");
        }

        Pedido pedido = new Pedido();
        pedido.setIdUsuario(req.getIdUsuario());
        pedido.setIdDireccion(req.getIdDireccion());

        BigDecimal subtotal = BigDecimal.ZERO;
        for (ItemRequestDTO item : req.getItems()) {
            ProductoDTO prod = catalogoClient.obtenerProducto(item.getIdProducto());
            DetallePedido d = new DetallePedido();
            d.setPedido(pedido);
            d.setIdProducto(prod.getId());
            d.setNombreProducto(prod.getNombre());
            d.setPrecioUnitario(prod.getPrecio());
            d.setCantidad(item.getCantidad());
            d.setSubtotal(prod.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad())));
            pedido.getDetalles().add(d);
            subtotal = subtotal.add(d.getSubtotal());
        }

        BigDecimal costoEnvio = subtotal.compareTo(envioGratisDesde) >= 0
                ? BigDecimal.ZERO
                : costoEnvioEstandar;

        pedido.setSubtotal(subtotal);
        pedido.setCostoEnvio(costoEnvio);
        pedido.setTotal(subtotal.add(costoEnvio));
        pedido.setEstado("CREADO");
        Pedido guardado = pedidoRepo.save(pedido);

        List<DetallePedido> descontados = new ArrayList<>();
        try {
            for (DetallePedido d : guardado.getDetalles()) {
                inventarioClient.descontar(new DescuentoStockDTO(
                        d.getIdProducto(), d.getCantidad(), "Venta pedido " + guardado.getId(), guardado.getId()));
                descontados.add(d);
            }
        } catch (RuntimeException ex) {
            for (DetallePedido d : descontados) {
                try {
                    inventarioClient.agregar(new DescuentoStockDTO(
                            d.getIdProducto(), d.getCantidad(), "Compensación por pedido fallido", null));
                } catch (RuntimeException e2) {
                    log.error("No se pudo devolver el stock del producto {}", d.getIdProducto(), e2);
                }
            }
            throw ex;
        }

        registrarHistorial(guardado.getId(), "CREADO");

        return guardado;
    }

    public Pedido findByIdOrThrow(Long id) {
        return pedidoRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Pedido " + id + " no encontrado"));
    }

    public List<Pedido> porUsuario(Long idUsuario) {
        return pedidoRepo.findByIdUsuarioOrderByFechaCreacionDesc(idUsuario);
    }

    public List<Pedido> listar(String estado) {
        if (estado == null || estado.isBlank()) {
            return pedidoRepo.findAll();
        }
        return pedidoRepo.findByEstadoOrderByFechaCreacionDesc(estado.toUpperCase());
    }

    public List<HistorialEstadoPedido> historial(Long idPedido) {
        findByIdOrThrow(idPedido);
        return historialRepo.findByIdPedidoOrderByFechaAsc(idPedido);
    }

    @Transactional
    public Pedido cambiarEstado(Long id, String nuevo) {
        Pedido p = findByIdOrThrow(id);
        String actual = p.getEstado();
        if (!TRANSICIONES.getOrDefault(actual, Set.of()).contains(nuevo)) {
            throw new ConflictException("No se puede pasar el pedido de " + actual + " a " + nuevo);
        }

        if ("CANCELADO".equals(nuevo)) {
            for (DetallePedido d : p.getDetalles()) {
                inventarioClient.agregar(new DescuentoStockDTO(
                        d.getIdProducto(), d.getCantidad(), "Pedido " + p.getId() + " cancelado", p.getId()));
            }
        }
        p.setEstado(nuevo);
        Pedido guardado = pedidoRepo.save(p);
        registrarHistorial(guardado.getId(), nuevo);
        return guardado;
    }

    private void registrarHistorial(Long idPedido, String estado) {
        HistorialEstadoPedido h = new HistorialEstadoPedido();
        h.setIdPedido(idPedido);
        h.setEstado(estado);
        historialRepo.save(h);
    }
}

