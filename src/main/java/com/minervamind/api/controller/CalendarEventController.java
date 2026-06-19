package com.minervamind.api.controller;

import com.minervamind.api.dto.CalendarEventRequestDTO;
import com.minervamind.api.dto.CalendarEventResponseDTO;
import com.minervamind.api.service.CalendarEventService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/calendar-events")
@CrossOrigin(origins = "*")
public class CalendarEventController {

    private final CalendarEventService service;

    public CalendarEventController(CalendarEventService service) {
        this.service = service;
    }

    @PostMapping
    public CalendarEventResponseDTO save(@RequestBody CalendarEventRequestDTO dto) {
        return service.save(dto);
    }

    @GetMapping
    public List<CalendarEventResponseDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CalendarEventResponseDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/user/{userId}")
    public List<CalendarEventResponseDTO> findByUser(@PathVariable Long userId) {
        return service.findByUser(userId);
    }

    @GetMapping("/user/{userId}/date/{date}")
    public List<CalendarEventResponseDTO> findByUserAndDate(
            @PathVariable Long userId,
            @PathVariable String date) {
        return service.findByUserAndDate(userId, LocalDate.parse(date));
    }

    @PutMapping("/{id}")
    public CalendarEventResponseDTO update(
            @PathVariable Long id,
            @RequestBody CalendarEventRequestDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
