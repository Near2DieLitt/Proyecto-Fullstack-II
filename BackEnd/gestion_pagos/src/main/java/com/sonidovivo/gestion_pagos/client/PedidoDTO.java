package com.sonidovivo.gestion_pagos.client;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {
    private Long id;
    private Long idUsuario;
    private BigDecimal total;
    private String estado;
}

