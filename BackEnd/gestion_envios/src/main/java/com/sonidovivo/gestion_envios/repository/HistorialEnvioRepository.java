package com.sonidovivo.gestion_envios.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_envios.model.HistorialEnvio;

public interface HistorialEnvioRepository extends JpaRepository<HistorialEnvio, Long> {
    List<HistorialEnvio> findByIdEnvioOrderByFechaAsc(Long idEnvio);
}
