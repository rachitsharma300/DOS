package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * UserRepository - find by username.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // METHOD FOR ADMIN
    long countByRole(Role role);
}
