package com.sonidovivo.gestion_pedidos.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DescuentoStockDTO {
    private Long idProducto;
    private Integer cantidad;
    private String motivo;
    private Long idPedido;
}

