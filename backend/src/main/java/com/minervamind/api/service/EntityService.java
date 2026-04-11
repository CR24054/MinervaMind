package com.minervamind.api.service;

import com.minervamind.api.dto.EntityRequestDTO;
import com.minervamind.api.dto.EntityResponseDTO;
import com.minervamind.api.model.Entity;
import com.minervamind.api.repository.EntityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EntityService {

    private final EntityRepository repository;

    public EntityService(EntityRepository repository) {
        this.repository = repository;
    }

    // Save a new entity
    public EntityResponseDTO save(EntityRequestDTO requestDTO) {
        Entity entity = convertToEntity(requestDTO);
        Entity savedEntity = repository.save(entity);
        return convertToResponseDTO(savedEntity);
    }

    // Return all entities from the database and map them to response DTOs
    public List<EntityResponseDTO> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // Find one entity by id
    public EntityResponseDTO findById(Long id) {
        Entity entityFound = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("No entity found with ID: " + id));

        return convertToResponseDTO(entityFound);
    }

    // Update entity data
    public EntityResponseDTO update(Long id, EntityRequestDTO requestDTO) {
        Entity existingEntity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot update. Entity not found with ID: " + id));

        existingEntity.setName(requestDTO.getName());

        Entity updatedEntity = repository.save(existingEntity);
        return convertToResponseDTO(updatedEntity);
    }

    // Delete an entity by id
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // Convert request DTO to entity object before persisting
    private Entity convertToEntity(EntityRequestDTO dto) {
        Entity entity = new Entity();
        entity.setName(dto.getName());
        return entity;
    }

    // Convert entity to response DTO for client output
    private EntityResponseDTO convertToResponseDTO(Entity entity) {
        return new EntityResponseDTO(
                entity.getId(),
                entity.getName()
        );
    }
}