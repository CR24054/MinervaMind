package com.minervamind.api.service;

import com.minervamind.api.dto.UserRequestDTO;
import com.minervamind.api.dto.UserResponseDTO;
import com.minervamind.api.model.User;
import com.minervamind.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserResponseDTO save(UserRequestDTO requestDTO) {
        User user = convertToUser(requestDTO);
        User savedUser = repository.save(user);
        return convertToResponseDTO(savedUser);
    }

    public List<UserResponseDTO> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public UserResponseDTO findById(Long id) {
        User userFound = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("No user found with ID: " + id));
        return convertToResponseDTO(userFound);
    }

    public UserResponseDTO update(Long id, UserRequestDTO requestDTO) {
        User existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cannot update. Entity not found with ID: " + id));

        existingUser.setUsuario(requestDTO.getUsuario());
        existingUser.setEmail(requestDTO.getEmail());
        existingUser.setPasswordHash(requestDTO.getPasswordHash());

        User updatedUser = repository.save(existingUser);
        return convertToResponseDTO(updatedUser);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private User convertToUser(UserRequestDTO dto) {
        User user = new User();
        user.setUsuario(dto.getUsuario());
        user.setEmail(dto.getEmail());
        user.setPasswordHash(dto.getPasswordHash());
        return user;
    }

    private UserResponseDTO convertToResponseDTO(User user) {
        return new UserResponseDTO(
                user.getIdUsuario(),
                user.getUsuario(),
                user.getEmail(),
                user.getFechaRegistro()
        );
    }
}