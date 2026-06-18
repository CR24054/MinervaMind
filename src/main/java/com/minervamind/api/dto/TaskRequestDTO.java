package com.minervamind.api.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequestDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private boolean completed;
    private Long userId;
}