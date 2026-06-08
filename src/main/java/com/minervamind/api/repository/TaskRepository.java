package com.minervamind.api.repository;

import com.minervamind.api.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}