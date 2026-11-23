package com.sonidovivo.gestion_pedidos.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRequestDTO {
    @NotNull(message = "El usuario es obligatorio")
    private Long idUsuario;

    @NotNull(message = "La dirección de despacho es obligatoria")
    private Long idDireccion;

    @NotEmpty(message = "El pedido debe tener al menos un producto")
    @Valid
    private List<ItemRequestDTO> items;
}

