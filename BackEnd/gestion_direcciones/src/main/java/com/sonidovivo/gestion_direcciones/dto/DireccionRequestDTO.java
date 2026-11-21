package com.sonidovivo.gestion_direcciones.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DireccionRequestDTO {
    @NotNull(message = "El usuario es obligatorio")
    private Long idUsuario;

    @NotBlank(message = "La calle es obligatoria")
    @Size(max = 150, message = "La calle no puede superar 150 caracteres")
    private String calle;

    @NotBlank(message = "El número es obligatorio")
    @Size(max = 20, message = "El número no puede superar 20 caracteres")
    private String numero;

    @Size(max = 20, message = "El depto no puede superar 20 caracteres")
    private String depto;

    @Size(max = 200, message = "La referencia no puede superar 200 caracteres")
    private String referencia;

    @NotNull(message = "La comuna es obligatoria")
    private Long idComuna;

    private Boolean principal;
}
