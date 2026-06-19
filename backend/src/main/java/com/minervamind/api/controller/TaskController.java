package com.minervamind.api.controller;

import com.minervamind.api.dto.TaskRequestDTO;
import com.minervamind.api.dto.TaskResponseDTO;
import com.minervamind.api.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public TaskResponseDTO save(@RequestBody TaskRequestDTO requestDTO) {
        return taskService.save(requestDTO);
    }

    @GetMapping
    public List<TaskResponseDTO> findAll() {
        return taskService.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<TaskResponseDTO> findByUser(@PathVariable Long userId) {
        return taskService.findByUser(userId);
    }

    @GetMapping("/{id}")
    public TaskResponseDTO findById(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO update(@PathVariable Long id, @RequestBody TaskRequestDTO requestDTO) {
        return taskService.update(id, requestDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}