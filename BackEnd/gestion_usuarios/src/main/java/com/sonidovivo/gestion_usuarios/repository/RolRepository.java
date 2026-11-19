package com.sonidovivo.gestion_usuarios.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sonidovivo.gestion_usuarios.model.Rol;



public interface RolRepository extends JpaRepository<Rol, Long> {
    Optional<Rol> findByNombre(String nombre);
}
