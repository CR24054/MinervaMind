package com.minervamind.api.controller;

import com.minervamind.api.dto.SleepRequestDTO;
import com.minervamind.api.dto.SleepResponseDTO;
import com.minervamind.api.dto.SleepSummaryResponseDTO;
import com.minervamind.api.dto.SleepRecommendationResponseDTO;
import com.minervamind.api.service.SleepService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sleep")
@CrossOrigin(origins = "*")
@Tag(
        name = "Sleep Tracking",
        description = "Sleep management and rest tracking operations"
)
public class SleepController {

    private final SleepService sleepService;

    public SleepController(SleepService sleepService) {
        this.sleepService = sleepService;
    }

    @Operation(summary = "Create a new sleep record")
    @PostMapping
    public SleepResponseDTO save(@RequestBody SleepRequestDTO requestDTO) {
        return sleepService.save(requestDTO);
    }

    @Operation(summary = "Get all sleep records")
    @GetMapping
    public List<SleepResponseDTO> findAll() {
        return sleepService.findAll();
    }

    @Operation(summary = "Get sleep record by id")
    @GetMapping("/{id}")
    public SleepResponseDTO findById(@PathVariable Long id) {
        return sleepService.findById(id);
    }

    @Operation(summary = "Update sleep record")
    @PutMapping("/{id}")
    public SleepResponseDTO update(
            @PathVariable Long id,
            @RequestBody SleepRequestDTO requestDTO) {

        return sleepService.update(id, requestDTO);
    }

    @Operation(summary = "Get sleep records by user")
    @GetMapping("/user/{userId}")
    public List<SleepResponseDTO> findByUser(@PathVariable Long userId) {
        return sleepService.findByUser(userId);
    }

    @Operation(summary = "Get latest sleep record")
    @GetMapping("/user/{userId}/latest")
    public SleepResponseDTO latestSleep(@PathVariable Long userId) {
        return sleepService.latestSleep(userId);
    }

    @Operation(summary = "Get sleep summary")
    @GetMapping("/user/{userId}/summary")
    public SleepSummaryResponseDTO summary(@PathVariable Long userId) {
        return sleepService.summary(userId);
    }

    @Operation(summary = "Get sleep recommendation")
    @GetMapping("/user/{userId}/recommendation")
    public SleepRecommendationResponseDTO recommendation(@PathVariable Long userId) {
        return sleepService.recommendation(userId);
    }

    @Operation(summary = "Delete sleep record")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sleepService.delete(id);
    }
}