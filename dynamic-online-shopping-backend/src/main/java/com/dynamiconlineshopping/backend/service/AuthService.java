package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.AuthRequest;
import com.dynamiconlineshopping.backend.dto.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * AuthService - authentication and registration.
 */
public interface AuthService extends UserDetailsService {
    Object register(RegisterRequest request);
    Object login(AuthRequest request);
}
