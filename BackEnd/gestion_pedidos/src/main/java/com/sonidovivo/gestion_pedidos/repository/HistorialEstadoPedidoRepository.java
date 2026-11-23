package com.sonidovivo.gestion_pedidos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_pedidos.model.HistorialEstadoPedido;

public interface HistorialEstadoPedidoRepository extends JpaRepository<HistorialEstadoPedido, Long> {
    List<HistorialEstadoPedido> findByIdPedidoOrderByFechaAsc(Long idPedido);
}
