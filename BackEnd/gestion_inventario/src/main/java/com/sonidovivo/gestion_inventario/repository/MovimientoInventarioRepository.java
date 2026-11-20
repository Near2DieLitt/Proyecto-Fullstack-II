package com.sonidovivo.gestion_inventario.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_inventario.model.MovimientoInventario;


public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {
    List<MovimientoInventario> findByInventarioIdOrderByFechaDesc(Long idInventario);
}
