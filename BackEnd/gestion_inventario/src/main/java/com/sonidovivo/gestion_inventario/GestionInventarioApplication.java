package com.sonidovivo.gestion_inventario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class GestionInventarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionInventarioApplication.class, args);
	}

}
