package com.minervamind.api.repository;

import com.minervamind.api.model.CalendarEvent;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface CalendarEventRepository extends CrudRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByUserId(Long userId);
    List<CalendarEvent> findByUserIdAndDate(Long userId, LocalDate date);
}
