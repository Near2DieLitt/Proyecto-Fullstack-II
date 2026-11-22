package com.sonidovivo.gestion_envios.model;


import java.time.LocalDate;
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
@Table(name = "envio")
public class Envio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_pedido", nullable = false, unique = true)
    private Long idPedido;

    @Column(name = "id_direccion", nullable = false)
    private Long idDireccion;

    @Column(nullable = false, length = 60)
    private String empresa;

    @Column(name = "codigo_seguimiento", nullable = false, length = 40, unique = true)
    private String codigoSeguimiento;

    @Column(nullable = false, length = 20)
    private String estado = "PREPARANDO";

    @Column(name = "fecha_estimada")
    private LocalDate fechaEstimada;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void asignarFecha() {
        this.fechaCreacion = LocalDateTime.now();
    }
}

