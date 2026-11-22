package com.sonidovivo.gestion_envios.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnvioEstadoRequestDTO {
    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "EN_CAMINO|ENTREGADO", message = "El estado debe ser EN_CAMINO o ENTREGADO")
    private String estado;

    @Size(max = 200, message = "El detalle no puede superar 200 caracteres")
    private String detalle;
}