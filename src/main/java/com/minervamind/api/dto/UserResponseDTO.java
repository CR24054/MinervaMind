package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private Long idUsuario;
    private String usuario;
    private String email;
    private LocalDateTime fechaRegistro;
}