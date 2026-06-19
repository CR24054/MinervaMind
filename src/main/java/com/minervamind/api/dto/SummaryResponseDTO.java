package com.minervamind.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SummaryResponseDTO {

    private Double averageStress;
    private Double averageEnergy;
    private Integer totalRecords;
}