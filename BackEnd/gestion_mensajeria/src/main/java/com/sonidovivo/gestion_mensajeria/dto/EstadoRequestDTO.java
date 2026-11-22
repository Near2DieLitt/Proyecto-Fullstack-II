package com.sonidovivo.gestion_mensajeria.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstadoRequestDTO {
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "PENDIENTE|LEIDO|RESPONDIDO",
            message = "El estado debe ser PENDIENTE, LEIDO o RESPONDIDO")
    private String estado;
}
