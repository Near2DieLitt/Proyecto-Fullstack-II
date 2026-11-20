package com.sonidovivo.gestion_inventario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockResponseDTO {
    private Long idProducto;
    private Integer stockTotal;
}
