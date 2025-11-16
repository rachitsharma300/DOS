package com.dynamiconlineshopping.backend.entity;

import com.dynamiconlineshopping.backend.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * User entity (minimal).
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // email or username

    @Column(nullable = false)
    private String password;

    private String fullName;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;
}
