package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long userId;
    
    public AuthResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }
}
