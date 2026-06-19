package com.minervamind.api.service;

import com.minervamind.api.dto.TaskRequestDTO;
import com.minervamind.api.dto.TaskResponseDTO;
import com.minervamind.api.model.Task;
import com.minervamind.api.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponseDTO save(TaskRequestDTO requestDTO) {
        Task task = new Task();

        task.setTitle(requestDTO.getTitle());
        task.setDescription(requestDTO.getDescription());
        task.setDueDate(requestDTO.getDueDate());
        task.setPriority(requestDTO.getPriority());
        task.setCompleted(requestDTO.isCompleted());
        task.setUserId(requestDTO.getUserId());

        Task savedTask = taskRepository.save(task);

        return mapToResponseDTO(savedTask);
    }

    public List<TaskResponseDTO> findByUser(Long userId) {
        List<TaskResponseDTO> tasks = new ArrayList<>();
        taskRepository.findByUserId(userId).forEach(task -> tasks.add(mapToResponseDTO(task)));
        return tasks;
    }

    public List<TaskResponseDTO> findByUserAndDate(Long userId, LocalDate date) {
        List<TaskResponseDTO> tasks = new ArrayList<>();
        taskRepository.findByUserIdAndDueDate(userId, date).forEach(task -> tasks.add(mapToResponseDTO(task)));
        return tasks;
    }

    public List<TaskResponseDTO> findAll() {
        List<TaskResponseDTO> tasks = new ArrayList<>();

        taskRepository.findAll().forEach(task -> {
            tasks.add(mapToResponseDTO(task));
        });

        return tasks;
    }

    public TaskResponseDTO findById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return mapToResponseDTO(task);
    }

    public TaskResponseDTO update(Long id, TaskRequestDTO requestDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(requestDTO.getTitle());
        task.setDescription(requestDTO.getDescription());
        task.setDueDate(requestDTO.getDueDate());
        task.setPriority(requestDTO.getPriority());
        task.setCompleted(requestDTO.isCompleted());

        Task updatedTask = taskRepository.save(task);

        return mapToResponseDTO(updatedTask);
    }

    public void delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    private TaskResponseDTO mapToResponseDTO(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.isCompleted(),
                task.getUserId()
        );
    }
}