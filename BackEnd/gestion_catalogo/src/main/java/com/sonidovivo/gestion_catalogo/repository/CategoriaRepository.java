package com.sonidovivo.gestion_catalogo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sonidovivo.gestion_catalogo.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
}
