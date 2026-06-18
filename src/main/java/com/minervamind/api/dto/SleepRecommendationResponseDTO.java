package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SleepRecommendationResponseDTO {

    private String sleepQuality;
    private String recommendation;
}