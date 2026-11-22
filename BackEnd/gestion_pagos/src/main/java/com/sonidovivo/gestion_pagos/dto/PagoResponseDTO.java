package com.sonidovivo.gestion_pagos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.sonidovivo.gestion_pagos.model.Pago;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagoResponseDTO {
    private Long id;
    private Long idPedido;
    private String metodoPago;
    private BigDecimal monto;
    private String estado;
    private String codigoTransaccion;
    private LocalDateTime fecha;

    public static PagoResponseDTO from(Pago p) {
        return new PagoResponseDTO(p.getId(), p.getIdPedido(), p.getMetodoPago().getNombre(),
                p.getMonto(), p.getEstado(), p.getCodigoTransaccion(), p.getFecha());
    }
}

