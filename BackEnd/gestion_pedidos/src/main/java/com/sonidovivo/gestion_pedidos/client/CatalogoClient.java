package com.sonidovivo.gestion_pedidos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-catalogo", url = "${ms.catalogo.url}")
public interface CatalogoClient {

    @GetMapping("/api/productos/{id}")
    ProductoDTO obtenerProducto(@PathVariable("id") Long id);
}
