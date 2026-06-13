package com.minervamind.api.controller;

import com.minervamind.api.dto.MoodRequestDTO;
import com.minervamind.api.dto.MoodResponseDTO;
import com.minervamind.api.service.MoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import com.minervamind.api.dto.SummaryResponseDTO;
import com.minervamind.api.dto.RecommendationResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/moods")
@CrossOrigin(origins = "*")
@Tag(
        name = "Mood Tracking",
        description = "Mood management and emotional tracking operations"
)
public class MoodController {

    private final MoodService moodService;

    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }

    @Operation(summary = "Create a new mood record")
    @PostMapping
    public MoodResponseDTO save(@RequestBody MoodRequestDTO requestDTO) {
        return moodService.save(requestDTO);
    }

    @Operation(summary = "Get all mood records")
    @GetMapping
    public List<MoodResponseDTO> findAll() {
        return moodService.findAll();
    }

    @Operation(summary = "Get mood record by id")
    @GetMapping("/{id}")
    public MoodResponseDTO findById(@PathVariable Long id) {
        return moodService.findById(id);
    }

    // ← AQUÍ EMPIEZAN LOS NUEVOS MÉTODOS

    @Operation(summary = "Update mood record")
    @PutMapping("/{id}")
    public MoodResponseDTO update(
            @PathVariable Long id,
            @RequestBody MoodRequestDTO requestDTO) {

        return moodService.update(id, requestDTO);
    }

    @Operation(summary = "Get moods by user")
    @GetMapping("/user/{userId}")
    public List<MoodResponseDTO> findByUser(@PathVariable Long userId) {
        return moodService.findByUser(userId);
    }

    @Operation(summary = "Get latest mood")
    @GetMapping("/user/{userId}/latest")
    public MoodResponseDTO latestMood(@PathVariable Long userId) {
        return moodService.latestMood(userId);
    }

    @Operation(summary = "Get emotional summary")
    @GetMapping("/user/{userId}/summary")
    public SummaryResponseDTO summary(@PathVariable Long userId) {
        return moodService.summary(userId);
    }

    @Operation(summary = "Get recommendation")
    @GetMapping("/user/{userId}/recommendation")
    public RecommendationResponseDTO recommendation(@PathVariable Long userId) {
        return moodService.recommendation(userId);
    }

    @Operation(summary = "Delete mood record")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        moodService.delete(id);
    }

}