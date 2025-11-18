package com.dynamiconlineshopping.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String tokenPrefix = "Bearer ";

        System.out.println("🔐 JwtAuthFilter - Processing request: " + request.getRequestURI());
        System.out.println("🔐 Authorization header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith(tokenPrefix)) {
            System.out.println("🔐 No valid Authorization header found");
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(tokenPrefix.length());

        try {
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            System.out.println("🔐 Extracted username: " + username);
            System.out.println("🔐 Extracted role: " + role);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                var userDetails = customUserDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(token)) {
                    List<GrantedAuthority> authorities = Collections.singletonList(
                            new SimpleGrantedAuthority("ROLE_" + role)
                    );

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    authorities
                            );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("🔐 Authentication SUCCESS for user: " + username + " with role: " + role);
                }
            }
        } catch (Exception e) {
            System.out.println("🔐 JWT validation failed: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}