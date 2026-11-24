package com.sonidovivo.gestion_direcciones.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_direcciones.model.Direccion;
import com.sonidovivo.gestion_direcciones.model.Comuna;
import com.sonidovivo.gestion_direcciones.model.Region;

@DataJpaTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:direcciones;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.flyway.enabled=false"})
class DireccionRepositoryTest {
    @Autowired private DireccionRepository repository;
    @Autowired private ComunaRepository comunaRepository;
    @Autowired private RegionRepository regionRepository;

    @Test
    void filtraDireccionesPorUsuario() {
        Region region = new Region();
        region.setNombre("Metropolitana");
        region = regionRepository.save(region);
        Comuna comuna = new Comuna();
        comuna.setNombre("Santiago");
        comuna.setRegion(region);
        comuna = comunaRepository.save(comuna);

        Direccion direccion = new Direccion();
        direccion.setIdUsuario(9L);
        direccion.setCalle("Prueba");
        direccion.setNumero("1");
        direccion.setComuna(comuna);
        repository.save(direccion);
        assertEquals(1, repository.findByIdUsuario(9L).size());
    }
}
