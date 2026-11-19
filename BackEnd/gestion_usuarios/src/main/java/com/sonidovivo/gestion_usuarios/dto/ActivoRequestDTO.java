package com.sonidovivo.gestion_usuarios.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivoRequestDTO {
    @NotNull(message = "El campo activo es obligatorio")
    private Boolean activo;
}
