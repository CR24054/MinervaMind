package com.minervamind.api.repository;

import com.minervamind.api.model.Sleep;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SleepRepository extends CrudRepository<Sleep, Long> {

    List<Sleep> findByUserIdUsuario(Long userId);

    Optional<Sleep> findTopByUserIdUsuarioOrderByDateDescIdDesc(Long userId);
}