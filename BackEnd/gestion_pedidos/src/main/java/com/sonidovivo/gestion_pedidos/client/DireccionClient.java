package com.sonidovivo.gestion_pedidos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-direcciones", url = "${ms.direcciones.url}")
public interface DireccionClient {

    @GetMapping("/api/direcciones/{id}")
    DireccionDTO obtenerDireccion(@PathVariable("id") Long id);
}
