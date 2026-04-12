package com.minervamind.api.controller;

import com.minervamind.api.dto.UserRequestDTO;
import com.minervamind.api.dto.UserResponseDTO;
import com.minervamind.api.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor // Genera un constructor con los argumentos requeridos (finales)
@CrossOrigin(origins = "*") //permite solicitudes desde cualquier origen
public class UserController {

    private final UserService service; // Inyección de dependencia del servicio

    /*integracion de requiredArgsConstructor para eliminar el constructor manual

    public UserController(UserService service) { 
        this.service = service;
    }
    */

    @PostMapping // Endpoint para crear un nuevo usuario
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO responseDTO = service.save(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping // Endpoint para obtener todos los usuarios
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        List<UserResponseDTO> users = service.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}") // Endpoint para obtener un usuario por su ID
    public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id) {
        UserResponseDTO responseDTO = service.findById(id);
        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/{id}") // Endpoint para actualizar un usuario existente por su ID
    public ResponseEntity<UserResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO responseDTO = service.update(id, requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{id}") // Endpoint para eliminar un usuario por su ID
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
