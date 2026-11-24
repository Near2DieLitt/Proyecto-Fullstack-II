package com.sonidovivo.gestion_pagos.repository;
import static org.junit.jupiter.api.Assertions.*;
import java.math.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import com.sonidovivo.gestion_pagos.model.*;

@DataJpaTest(properties = {
        "spring.flyway.enabled=false",
        "spring.jpa.hibernate.ddl-auto=create-drop" })
class PagoRepositoryTest{
    @Autowired PagoRepository pagos;
    @Autowired MetodoPagoRepository metodos;
    @Test void encuentraPagoAprobado() {

        MetodoPago m=new MetodoPago();
        m.setNombre("Visa");
        m=metodos.save(m);
        Pago p=new Pago();
        p.setIdPedido(1L);
        p.setMetodoPago(m);
        p.setMonto(BigDecimal.TEN);
        p.setEstado("APROBADO");
        p.setCodigoTransaccion("TX-1");
        pagos.save(p);
        assertTrue(pagos.existsByIdPedidoAndEstado(1L,"APROBADO"));
        assertEquals(1,pagos.findByIdPedidoOrderByFechaDesc(1L).size());

    }
}