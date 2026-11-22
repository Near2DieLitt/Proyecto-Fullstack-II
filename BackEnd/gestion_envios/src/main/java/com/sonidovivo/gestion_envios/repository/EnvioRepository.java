package com.sonidovivo.gestion_envios.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonidovivo.gestion_envios.model.Envio;

public interface EnvioRepository extends JpaRepository<Envio, Long> {
    Optional<Envio> findByIdPedido(Long idPedido);

    Optional<Envio> findByCodigoSeguimiento(String codigo);

    boolean existsByIdPedido(Long idPedido);

    boolean existsByCodigoSeguimiento(String codigo);
}

