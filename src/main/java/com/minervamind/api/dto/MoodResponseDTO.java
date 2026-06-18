package com.minervamind.api.dto;

import com.minervamind.api.model.MoodType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class MoodResponseDTO {

    private Long id;

    private MoodType moodType;

    private Integer stressLevel;

    private Integer energyLevel;

    private String note;

    private LocalDate date;

    private String username;
}