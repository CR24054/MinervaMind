package com.minervamind.api.repository;

import com.minervamind.api.model.Mood;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MoodRepository extends CrudRepository<Mood, Long> {

    List<Mood> findByUserIdUsuario(Long userId);

    Optional<Mood> findTopByUserIdUsuarioOrderByDateDescIdDesc(Long userId);
}