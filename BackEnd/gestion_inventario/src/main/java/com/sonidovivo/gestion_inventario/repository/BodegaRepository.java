package com.sonidovivo.gestion_inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_inventario.model.Bodega;



public interface BodegaRepository extends JpaRepository<Bodega, Long> {
    boolean existsByNombre(String nombre);
}
