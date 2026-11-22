package com.sonidovivo.gestion_envios.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("ms-envios API")
                        .version("1.0.0")
                        .description("API REST para la gestión de despacho y seguimiento de envíos - Sonido Vivo")
                        .contact(new Contact()
                                .name("DSY1104")
                                .email("ejemplo@gmail.com")))
                .addServersItem(new Server()
                        .url("http://localhost:8094")
                        .description("Servidor de desarrollo local"));
    }
}