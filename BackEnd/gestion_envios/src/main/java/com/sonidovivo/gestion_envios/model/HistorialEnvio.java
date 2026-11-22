package com.sonidovivo.gestion_envios.model;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "historial_envio")
public class HistorialEnvio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_envio", nullable = false)
    private Long idEnvio;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(length = 200)
    private String detalle;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fecha;

    @PrePersist
    protected void asignarFecha() {
        this.fecha = LocalDateTime.now();
    }
}

