package com.dynamiconlineshopping.backend.dto;

import com.dynamiconlineshopping.backend.enums.Role;
import lombok.*;

/**
 * UserDto - Data Transfer Object for User information
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String fullName;
    private Role role;
}