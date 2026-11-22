package com.sonidovivo.gestion_envios.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.sonidovivo.gestion_envios.model.Envio;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnvioResponseDTO {
    private Long id;
    private Long idPedido;
    private Long idDireccion;
    private String empresa;
    private String codigoSeguimiento;
    private String estado;
    private LocalDate fechaEstimada;
    private LocalDateTime fechaCreacion;

    public static EnvioResponseDTO from(Envio e) {
        return new EnvioResponseDTO(e.getId(), e.getIdPedido(), e.getIdDireccion(), e.getEmpresa(),
                e.getCodigoSeguimiento(), e.getEstado(), e.getFechaEstimada(), e.getFechaCreacion());
    }
}

