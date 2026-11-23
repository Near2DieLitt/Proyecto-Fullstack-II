package com.sonidovivo.gestion_pedidos.dto;

import java.math.BigDecimal;

import com.sonidovivo.gestion_pedidos.model.DetallePedido;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetalleResponseDTO {
    private Long idProducto;
    private String nombreProducto;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal;

    public static DetalleResponseDTO from(DetallePedido d) {
        return new DetalleResponseDTO(d.getIdProducto(), d.getNombreProducto(), d.getPrecioUnitario(),
                d.getCantidad(), d.getSubtotal());
    }
}

