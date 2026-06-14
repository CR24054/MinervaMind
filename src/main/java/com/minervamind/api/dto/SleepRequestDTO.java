package com.minervamind.api.dto;

import com.minervamind.api.model.SleepQuality;
import lombok.Data;

import java.time.LocalTime;

@Data
public class SleepRequestDTO {

    private LocalTime bedTime;

    private LocalTime wakeTime;

    private Double hoursSlept;

    private SleepQuality sleepQuality;

    private String note;

    private Long userId;
}