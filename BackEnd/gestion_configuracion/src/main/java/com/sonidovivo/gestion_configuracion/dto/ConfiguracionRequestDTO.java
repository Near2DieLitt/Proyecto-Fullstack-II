package com.sonidovivo.gestion_configuracion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class ConfiguracionRequestDTO {
    @NotBlank (message = "La clave es obligatoria")
    @Size (max = 50, message = "La clave puede tener máximo 50 caracteres")
    private String clave;

    @NotBlank(message = "El valor es obligatorio")
    @Size(max = 200, message = "El valor puede tener máximo 200 caracteres")
    private String valor;

    @Size(max = 200, message = "La descripción puede tener máximo 200 caracteres")
    private String descripcion;
}
