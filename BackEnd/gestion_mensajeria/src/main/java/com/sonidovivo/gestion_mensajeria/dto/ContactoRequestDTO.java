package com.sonidovivo.gestion_mensajeria.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactoRequestDTO {
    @NotBlank(message = "Debe ingresar su nombre")
    @Size(max = 150, message = "El nombre no puede superar 150 caracteres")
    private String nombreCompleto;

    @NotBlank(message = "Debe ingresar su correo")
    @Email(message = "Ingrese un correo válido")
    @Size(max = 150, message = "El correo no puede superar 150 caracteres")
    private String correo;

    @NotBlank(message = "Debe ingresar un mensaje")
    @Size(max = 2000, message = "El mensaje no puede superar 2000 caracteres")
    private String mensaje;
}
