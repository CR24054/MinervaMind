package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class CalendarEventResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String eventType;
    private Long userId;
}
