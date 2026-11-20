package com.sonidovivo.gestion_inventario.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.model.Inventario;
import com.sonidovivo.gestion_inventario.repository.BodegaRepository;
import com.sonidovivo.gestion_inventario.repository.InventarioRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final InventarioRepository inventarioRepo;
    private final BodegaRepository bodegaRepo;

    @Override
    public void run(String... args) {
        if (inventarioRepo.count() > 0) {
            return;
        }
        Bodega central = bodegaRepo.findAll().stream().findFirst().orElseThrow();
        for (long idProducto = 1; idProducto <= 10; idProducto++) {
            Inventario inv = new Inventario();
            inv.setIdProducto(idProducto);
            inv.setBodega(central);
            inv.setStockActual(10);
            inv.setStockMinimo(2);
            inventarioRepo.save(inv);
        }
    }
}
