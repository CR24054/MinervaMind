package com.minervamind.api.dto;

import com.minervamind.api.model.MoodType;
import lombok.Data;

@Data
public class MoodRequestDTO {

    private MoodType moodType;

    private Integer stressLevel;

    private Integer energyLevel;

    private String note;

    private Long userId;
}