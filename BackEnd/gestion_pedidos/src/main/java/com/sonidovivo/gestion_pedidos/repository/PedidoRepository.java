package com.sonidovivo.gestion_pedidos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_pedidos.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByIdUsuarioOrderByFechaCreacionDesc(Long idUsuario);

    List<Pedido> findByEstadoOrderByFechaCreacionDesc(String estado);
}