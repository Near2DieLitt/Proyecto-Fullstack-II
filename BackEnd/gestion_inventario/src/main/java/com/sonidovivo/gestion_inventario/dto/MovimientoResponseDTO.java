package com.sonidovivo.gestion_inventario.dto;

import java.time.LocalDateTime;

import com.sonidovivo.gestion_inventario.model.MovimientoInventario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovimientoResponseDTO {
    private Long id;
    private String tipo;
    private Integer cantidad;
    private String motivo;
    private Long idPedido;
    private LocalDateTime fecha;

    public static MovimientoResponseDTO from(MovimientoInventario m) {
        return new MovimientoResponseDTO(m.getId(), m.getTipo(), m.getCantidad(), m.getMotivo(),
                m.getIdPedido(), m.getFecha());
    }
}
