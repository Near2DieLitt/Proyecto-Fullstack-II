package com.sonidovivo.gestion_direcciones.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_direcciones.model.Direccion;



public interface DireccionRepository extends JpaRepository<Direccion, Long> {
    List<Direccion> findByIdUsuario(Long idUsuario);
}
