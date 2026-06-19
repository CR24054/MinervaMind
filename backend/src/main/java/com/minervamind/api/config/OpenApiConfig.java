package com.minervamind.api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "API MinervaMind",
                version = "1.0",
                description = "API REST para la gestión de usuarios en MinervaMind",
                contact = @Contact(
                        name = "Equipo MinervaMind",
                        email = "equipo@minervamind.com"
                )
        )
)
public class OpenApiConfig {
}
