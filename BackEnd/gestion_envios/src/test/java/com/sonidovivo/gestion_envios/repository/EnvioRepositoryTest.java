package com.sonidovivo.gestion_envios.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import com.sonidovivo.gestion_envios.model.Envio;

@DataJpaTest(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop" })
class EnvioRepositoryTest{
    @Autowired EnvioRepository repository;
    @Test void buscaPorPedidoYCodigo() {

        Envio e=new Envio();
        e.setIdPedido(2L);
        e.setIdDireccion(3L);
        e.setEmpresa("Correo");
        e.setCodigoSeguimiento("SV-1");
        repository.save(e);
        assertTrue(repository.findByIdPedido(2L).isPresent());
        assertTrue(repository.findByCodigoSeguimiento("SV-1").isPresent());

    }
}