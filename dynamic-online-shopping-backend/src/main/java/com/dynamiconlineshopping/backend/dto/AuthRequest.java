package com.dynamiconlineshopping.backend.dto;

import lombok.*;

/**
 * AuthRequest - login payload.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequest {
    private String email;
    private String password;
}
