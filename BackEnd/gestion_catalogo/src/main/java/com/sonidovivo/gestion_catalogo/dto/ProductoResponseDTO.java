package com.sonidovivo.gestion_catalogo.dto;

import java.math.BigDecimal;

import com.sonidovivo.gestion_catalogo.model.Producto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagenUrl;
    private Long idCategoria;
    private String categoria;
    private Long idMarca;
    private String marca;
    private Boolean destacado;
    private Boolean activo;

    public static ProductoResponseDTO from(Producto p) {
        return new ProductoResponseDTO(p.getId(), p.getNombre(), p.getDescripcion(), p.getPrecio(),
                p.getImagenUrl(), p.getCategoria().getId(), p.getCategoria().getNombre(),
                p.getMarca().getId(), p.getMarca().getNombre(), p.getDestacado(), p.getActivo());
    }
}
