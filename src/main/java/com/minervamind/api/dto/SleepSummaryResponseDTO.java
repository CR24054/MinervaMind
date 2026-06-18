package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SleepSummaryResponseDTO {

    private Double averageHoursSlept;
    private Integer totalRecords;
}