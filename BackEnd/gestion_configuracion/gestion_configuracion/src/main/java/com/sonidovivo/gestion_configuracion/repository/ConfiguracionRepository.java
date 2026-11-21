package com.sonidovivo.gestion_configuracion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_configuracion.model.Configuracion;

public interface ConfiguracionRepository extends JpaRepository<Configuracion, String> {
}
