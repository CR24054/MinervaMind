package com.minervamind.api.dto;

import com.minervamind.api.model.SleepQuality;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class SleepResponseDTO {

    private Long id;

    private LocalTime bedTime;

    private LocalTime wakeTime;

    private Double hoursSlept;

    private SleepQuality sleepQuality;

    private String note;

    private LocalDate date;

    private String username;
}