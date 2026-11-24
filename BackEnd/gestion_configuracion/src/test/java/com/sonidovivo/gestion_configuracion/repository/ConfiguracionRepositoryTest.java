package com.sonidovivo.gestion_configuracion.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_configuracion.model.Configuracion;

@DataJpaTest(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop" })
class ConfiguracionRepositoryTest {

    @Autowired
    private ConfiguracionRepository repository;

    @Test
    void guardaYObtieneConfiguracionPorClave() {
        repository.save(new Configuracion("IVA", "19", "Impuesto"));
        assertEquals("19", repository.findById("IVA").orElseThrow().getValor());
    }
}