package com.sonidovivo.gestion_envios.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnvioRequestDTO {
    @NotNull(message = "El pedido es obligatorio")
    private Long idPedido;

    @NotBlank(message = "La empresa de transporte es obligatoria")
    @Size(max = 60, message = "La empresa no puede superar 60 caracteres")
    private String empresa;

    private LocalDate fechaEstimada;
}
