package com.sonidovivo.gestion_pagos.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagoRequestDTO {
    @NotNull(message = "El pedido es obligatorio")
    private Long idPedido;

    @NotNull(message = "El método de pago es obligatorio")
    private Long idMetodoPago;

    @Size(min = 12, max = 19, message = "El número de tarjeta debe tener entre 12 y 19 dígitos")
    private String numeroTarjeta;
}
