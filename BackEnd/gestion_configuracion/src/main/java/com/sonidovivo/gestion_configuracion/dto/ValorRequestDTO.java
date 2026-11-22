package com.sonidovivo.gestion_configuracion.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class ValorRequestDTO {
    @NotBlank (message = "El valor es obligatorio")
    @Size (max = 200, message = "El valor puede tener máximo 200 caracteres")
    private String valor;
}