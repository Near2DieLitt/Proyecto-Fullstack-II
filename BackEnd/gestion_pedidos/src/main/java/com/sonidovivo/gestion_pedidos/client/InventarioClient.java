package com.sonidovivo.gestion_pedidos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ms-inventario", url = "${ms.inventario.url}")
public interface InventarioClient {

    @PutMapping("/api/inventario/descontar")
    void descontar(@RequestBody DescuentoStockDTO body);

    @PutMapping("/api/inventario/agregar")
    void agregar(@RequestBody DescuentoStockDTO body);
}
