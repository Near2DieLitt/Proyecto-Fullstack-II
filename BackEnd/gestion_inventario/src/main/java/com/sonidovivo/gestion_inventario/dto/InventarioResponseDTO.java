package com.sonidovivo.gestion_inventario.dto;


import com.sonidovivo.gestion_inventario.model.Inventario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventarioResponseDTO {
    private Long id;
    private Long idProducto;
    private Long idBodega;
    private String bodega;
    private Integer stockActual;
    private Integer stockMinimo;

    public static InventarioResponseDTO from(Inventario i) {
        return new InventarioResponseDTO(i.getId(), i.getIdProducto(), i.getBodega().getId(),
                i.getBodega().getNombre(), i.getStockActual(), i.getStockMinimo());
    }
}
