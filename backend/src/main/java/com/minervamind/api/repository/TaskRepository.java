package com.minervamind.api.repository;

import com.minervamind.api.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUserIdAndDueDate(Long userId, LocalDate dueDate);
}