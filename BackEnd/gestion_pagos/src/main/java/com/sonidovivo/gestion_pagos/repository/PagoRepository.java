package com.sonidovivo.gestion_pagos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_pagos.model.Pago;


public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByIdPedidoOrderByFechaDesc(Long idPedido);

    boolean existsByIdPedidoAndEstado(Long idPedido, String estado);
}