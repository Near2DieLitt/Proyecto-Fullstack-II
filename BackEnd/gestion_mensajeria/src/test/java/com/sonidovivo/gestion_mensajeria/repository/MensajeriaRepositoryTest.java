package com.sonidovivo.gestion_mensajeria.repository;


import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import com.sonidovivo.gestion_mensajeria.model.Mensajeria;

@DataJpaTest(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop" })
class MensajeriaRepositoryTest {
    @Autowired MensajeriaRepository repository;
    @Test void filtraPorEstado() {

        Mensajeria m=new Mensajeria();
        m.setNombreCompleto("Ana");
        m.setCorreo("ana@correo.cl");
        m.setMensaje("hola");
        m.setEstado("PENDIENTE");
        repository.save(m);
        assertEquals(1,repository.findByEstado("PENDIENTE").size());

    }
}