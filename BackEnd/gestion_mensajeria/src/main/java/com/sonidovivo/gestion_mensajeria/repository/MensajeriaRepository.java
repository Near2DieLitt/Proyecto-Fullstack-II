package com.sonidovivo.gestion_mensajeria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_mensajeria.model.Mensajeria;

public interface MensajeriaRepository extends JpaRepository<Mensajeria, Long> {
    List<Mensajeria> findByEstado(String estado);
}