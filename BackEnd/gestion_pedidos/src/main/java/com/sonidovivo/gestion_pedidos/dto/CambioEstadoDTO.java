package com.sonidovivo.gestion_pedidos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CambioEstadoDTO {
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "CREADO|PAGADO|DESPACHADO|ENTREGADO|CANCELADO",
            message = "Estado inválido (CREADO, PAGADO, DESPACHADO, ENTREGADO o CANCELADO)")
    private String estado;
}
