package com.sonidovivo.gestion_pagos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_pagos.model.MetodoPago;

public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {
    List<MetodoPago> findByActivoTrue();
}

