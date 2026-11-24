package com.sonidovivo.eurekaserver;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootTest
class EurekaserverApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void aplicacionTieneHabilitadoEurekaServer() {
		assertTrue(EurekaserverApplication.class.isAnnotationPresent(EnableEurekaServer.class));
	}

}
