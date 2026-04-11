package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EntityResponseDTO {
    private Long id;
    private String name;
}