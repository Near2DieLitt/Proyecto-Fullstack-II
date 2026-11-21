package com.sonidovivo.gestion_direcciones.dto;

import com.sonidovivo.gestion_direcciones.model.Direccion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DireccionResponseDTO {
    private Long id;
    private Long idUsuario;
    private String calle;
    private String numero;
    private String depto;
    private String referencia;
    private Long idComuna;
    private String comuna;
    private String region;
    private Boolean principal;

    public static DireccionResponseDTO from(Direccion d) {
        return new DireccionResponseDTO(d.getId(), d.getIdUsuario(), d.getCalle(), d.getNumero(),
                d.getDepto(), d.getReferencia(), d.getComuna().getId(), d.getComuna().getNombre(),
                d.getComuna().getRegion().getNombre(), d.getPrincipal());
    }
}
