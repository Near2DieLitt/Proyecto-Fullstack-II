package com.sonidovivo.gestion_inventario.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_inventario.model.Bodega;
import com.sonidovivo.gestion_inventario.model.Inventario;

@DataJpaTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:inventario;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.flyway.enabled=false"})
class InventarioRepositoryTest {
    @Autowired private InventarioRepository repository;
    @Autowired private BodegaRepository bodegaRepository;

    @Test
    void findBajoStockDevuelveInventarioBajoElMinimo() {
        Bodega bodega = new Bodega();
        bodega.setNombre("Central");
        bodega = bodegaRepository.save(bodega);
        Inventario inventario = new Inventario();
        inventario.setIdProducto(10L);
        inventario.setBodega(bodega);
        inventario.setStockActual(1);
        inventario.setStockMinimo(2);
        repository.save(inventario);

        assertEquals(1, repository.findBajoStock().size());
    }
}
