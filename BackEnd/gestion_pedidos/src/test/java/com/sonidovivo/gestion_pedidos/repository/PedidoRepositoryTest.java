package com.sonidovivo.gestion_pedidos.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import com.sonidovivo.gestion_pedidos.model.Pedido;

@DataJpaTest(properties = {
    "spring.flyway.enabled=false",
    "spring.jpa.hibernate.ddl-auto=create-drop" })
class PedidoRepositoryTest{
    @Autowired PedidoRepository repository;
    @Test void filtraPorUsuarioYEstado() {

        Pedido p=new Pedido();
        p.setIdUsuario(1L);
        p.setIdDireccion(2L);
        p.setSubtotal(BigDecimal.ONE);
        p.setCostoEnvio(BigDecimal.ZERO);
        p.setTotal(BigDecimal.ONE);
        p.setEstado("CREADO");
        repository.save(p);
        assertEquals(1,repository.findByIdUsuarioOrderByFechaCreacionDesc(1L).size());
        assertEquals(1,repository.findByEstadoOrderByFechaCreacionDesc("CREADO").size());

    }
}