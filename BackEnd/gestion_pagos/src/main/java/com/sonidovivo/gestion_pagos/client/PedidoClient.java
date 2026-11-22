package com.sonidovivo.gestion_pagos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-pedidos", url = "${ms.pedidos.url}")
public interface PedidoClient {

    @GetMapping("/api/pedidos/{id}")
    PedidoDTO obtenerPedido(@PathVariable("id") Long id);

    @PutMapping("/api/pedidos/{id}/estado")
    void cambiarEstado(@PathVariable("id") Long id, @RequestBody CambioEstadoDTO body);
}
