package com.minervamind.api.service;

import com.minervamind.api.dto.CalendarEventRequestDTO;
import com.minervamind.api.dto.CalendarEventResponseDTO;
import com.minervamind.api.model.CalendarEvent;
import com.minervamind.api.repository.CalendarEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarEventService {

    private final CalendarEventRepository repository;

    public CalendarEventService(CalendarEventRepository repository) {
        this.repository = repository;
    }

    public CalendarEventResponseDTO save(CalendarEventRequestDTO dto) {
        CalendarEvent event = new CalendarEvent();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setEventType(dto.getEventType());
        event.setUserId(dto.getUserId());

        CalendarEvent saved = repository.save(event);
        return mapToResponseDTO(saved);
    }

    public List<CalendarEventResponseDTO> findByUser(Long userId) {
        List<CalendarEventResponseDTO> result = new ArrayList<>();
        repository.findByUserId(userId).forEach(e -> result.add(mapToResponseDTO(e)));
        return result;
    }

    public List<CalendarEventResponseDTO> findByUserAndDate(Long userId, LocalDate date) {
        List<CalendarEventResponseDTO> result = new ArrayList<>();
        repository.findByUserIdAndDate(userId, date).forEach(e -> result.add(mapToResponseDTO(e)));
        return result;
    }

    public List<CalendarEventResponseDTO> findAll() {
        List<CalendarEventResponseDTO> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(mapToResponseDTO(e)));
        return result;
    }

    public CalendarEventResponseDTO findById(Long id) {
        CalendarEvent event = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendar event not found"));
        return mapToResponseDTO(event);
    }

    public CalendarEventResponseDTO update(Long id, CalendarEventRequestDTO dto) {
        CalendarEvent event = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendar event not found"));

        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setEventType(dto.getEventType());

        CalendarEvent updated = repository.save(event);
        return mapToResponseDTO(updated);
    }

    public void delete(Long id) {
        CalendarEvent event = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendar event not found"));
        repository.delete(event);
    }

    private CalendarEventResponseDTO mapToResponseDTO(CalendarEvent event) {
        return new CalendarEventResponseDTO(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getDate(),
                event.getTime(),
                event.getEventType(),
                event.getUserId()
        );
    }
}
