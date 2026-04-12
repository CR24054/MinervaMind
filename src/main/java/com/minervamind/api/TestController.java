package com.minervamind.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String welcome() {
        return "¡Bienvenido a MinervaMind! La aplicación está funcionando correctamente.";
    }
}
