package com.sonidovivo.gestion_pedidos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.sonidovivo.gestion_pedidos.model.Pedido;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoResponseDTO {
    private Long id;
    private Long idUsuario;
    private Long idDireccion;
    private BigDecimal subtotal;
    private BigDecimal costoEnvio;
    private BigDecimal total;
    private String estado;
    private LocalDateTime fechaCreacion;
    private List<DetalleResponseDTO> detalles;

    public static PedidoResponseDTO from(Pedido p) {
        return new PedidoResponseDTO(p.getId(), p.getIdUsuario(), p.getIdDireccion(), p.getSubtotal(),
                p.getCostoEnvio(), p.getTotal(), p.getEstado(),
                p.getFechaCreacion(), p.getDetalles().stream().map(DetalleResponseDTO::from).toList());
    }
}
