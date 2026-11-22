package com.sonidovivo.gestion_envios.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {
    private Long id;
    private Long idUsuario;
    private Long idDireccion;
    private String estado;
}

