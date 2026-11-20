package com.sonidovivo.gestion_catalogo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sonidovivo.gestion_catalogo.model.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
    Optional<Marca> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
}
