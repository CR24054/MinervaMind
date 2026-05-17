package com.minervamind.api.dto;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String usuario;
    private String email;
    private String passwordHash;
}
