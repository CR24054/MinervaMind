package com.minervamind.api.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CalendarEventRequestDTO {
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String eventType;
    private Long userId;
}
