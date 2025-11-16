package com.dynamiconlineshopping.backend.dto;

import lombok.*;

/**
 * RegisterRequest - registration payload.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
}
