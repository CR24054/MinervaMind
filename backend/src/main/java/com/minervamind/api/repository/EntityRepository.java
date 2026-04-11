package com.minervamind.api.repository;

import com.minervamind.api.model.Entity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityRepository extends CrudRepository<Entity, Long> {
}
