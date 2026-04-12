package com.minervamind.api.controller;

import com.minervamind.api.dto.UserRequestDTO;
import com.minervamind.api.dto.UserResponseDTO;
import com.minervamind.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// IMPORTACIONES DE SWAGGER / OPENAPI
// Estas permiten documentar los endpoints en Swagger UI
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")

// CONFIGURACIÓN SWAGGER - FASE C REQUERIDA
// Esta anotación define el nombre del grupo en Swagger UI
// y la descripción del módulo CRUD de usuarios
@Tag(
        name = "Usuarios",
        description = "Operaciones CRUD de usuarios en MinervaMind"
)

public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // DOCUMENTACIÓN SWAGGER - POST
    // Describe la operación de creación en Swagger UI
    @Operation(summary = "Crear un nuevo usuario")
    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO responseDTO = service.save(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // DOCUMENTACIÓN SWAGGER - GET LIST
    // Describe la operación de listado completo
    @Operation(summary = "Listar todos los usuarios registrados")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        List<UserResponseDTO> users = service.findAll();
        return ResponseEntity.ok(users);
    }

    // DOCUMENTACIÓN SWAGGER - GET BY ID
    // Describe la búsqueda de usuario individual
    @Operation(summary = "Buscar un usuario por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id) {
        UserResponseDTO responseDTO = service.findById(id);
        return ResponseEntity.ok(responseDTO);
    }

    // DOCUMENTACIÓN SWAGGER - PUT
    // Describe la actualización de usuario
    @Operation(summary = "Actualizar un usuario existente")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable Long id, @RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO responseDTO = service.update(id, requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    // DOCUMENTACIÓN SWAGGER - DELETE
    // Describe la eliminación de usuario
    @Operation(summary = "Eliminar un usuario por su ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
