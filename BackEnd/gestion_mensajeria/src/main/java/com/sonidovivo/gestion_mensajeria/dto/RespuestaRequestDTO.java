package com.sonidovivo.gestion_mensajeria.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RespuestaRequestDTO {
    @NotBlank(message = "La respuesta es obligatoria")
    @Size(max = 2000, message = "La respuesta no puede superar 2000 caracteres")
    private String respuesta;
}
