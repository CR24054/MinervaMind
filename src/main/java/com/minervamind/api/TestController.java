package com.minervamind.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

// CONFIGURACIÓN SWAGGER
// Define el grupo "Test" dentro de Swagger UI
@Tag(
        name = "Test",
        description = "Endpoint de verificación del estado del servicio MinervaMind"
)
public class TestController {

    // DOCUMENTACIÓN DEL ENDPOINT
    // Describe la función del endpoint raíz "/"
    @Operation(summary = "Verificar que la API MinervaMind está activa")
    @GetMapping("/")
    public String welcome() {
        return "¡Bienvenido a MinervaMind! La aplicación está funcionando correctamente.";
    }
}