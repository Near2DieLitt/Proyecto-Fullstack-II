package com.sonidovivo.gestion_direcciones;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import com.sonidovivo.gestion_direcciones.client.UsuarioClient;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:direcciones-app;DB_CLOSE_DELAY=-1",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.flyway.enabled=false",
		"eureka.client.enabled=false"})
class GestionDireccionesApplicationTests {
	@MockitoBean
	private UsuarioClient usuarioClient;

	@Test
	void contextLoads() {
	}

}
