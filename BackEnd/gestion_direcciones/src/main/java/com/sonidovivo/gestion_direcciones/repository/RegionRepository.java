package com.sonidovivo.gestion_direcciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_direcciones.model.Region;


public interface RegionRepository extends JpaRepository<Region, Long> {
}
