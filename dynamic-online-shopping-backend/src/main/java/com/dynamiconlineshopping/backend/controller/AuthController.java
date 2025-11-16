package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.AuthRequest;
import com.dynamiconlineshopping.backend.dto.RegisterRequest;
import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - handles registration and login.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String refreshTokenHeader) {
        // Optional: implement token refresh using authService
        return ResponseEntity.badRequest().body("Not implemented");
    }
}
