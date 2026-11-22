package com.sonidovivo.gestion_envios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients 
public class GestionEnviosApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionEnviosApplication.class, args);
	}

}
