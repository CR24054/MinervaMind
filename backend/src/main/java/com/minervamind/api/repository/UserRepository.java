package com.minervamind.api.repository;

import com.minervamind.api.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    java.util.Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
