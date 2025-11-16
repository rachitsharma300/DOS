package com.dynamiconlineshopping.backend.config;

import com.dynamiconlineshopping.backend.config.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

/**
 * SecurityConfig.java
 *
 * Main Spring Security configuration for the application.
 *
 * Responsibilities:
 *  - Define password encoder bean (BCrypt).
 *  - Expose AuthenticationManager bean (used by AuthService).
 *  - Register JwtAuthFilter into the filter chain.
 *  - Configure CORS, CSRF, session management (stateless for JWT).
 *  - Configure URL-based access rules (public vs protected endpoints).
 *
 * Notes:
 *  - This configuration follows modern Spring Security without extending the deprecated
 *    WebSecurityConfigurerAdapter.
 *  - Token retrieval & validation logic lives inside JwtAuthFilter / JwtUtil.
 *  - We assume authentication endpoints live under /api/auth/** and should be public.
 *  - Public product browsing endpoints (GET /api/products/**) are permitted without auth.
 *  - Admin-protected endpoints should use method-level security annotations (e.g., @PreAuthorize)
 *    as well as controller-level roles. EnableMethodSecurity is turned on below.
 */
@Configuration
@EnableMethodSecurity // enables method-level security annotations like @PreAuthorize
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Autowired
    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    /**
     * Password encoder bean for hashing user passwords.
     * Uses BCrypt which is a secure, adaptive hashing algorithm recommended for passwords.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Expose AuthenticationManager bean so it can be injected into services (e.g., AuthServiceImpl)
     * when performing manual authentication (username+password -> Authentication).
     *
     * AuthenticationConfiguration will build the AuthenticationManager based on configured
     * AuthenticationProviders (e.g., a DaoAuthenticationProvider that we will configure via
     * a UserDetailsService in AuthServiceImpl).
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Main security filter chain.
     *
     * - Disables CSRF because we use stateless JWT authentication (if you keep cookies with HttpOnly,
     *   consider enabling CSRF protection for state-changing endpoints).
     * - Configures CORS (CorsConfig should supply the CorsConfigurationSource bean).
     * - Sets session management to stateless (no HTTP session).
     * - Configures exception handling and request authorization rules.
     * - Registers JwtAuthFilter before UsernamePasswordAuthenticationFilter to validate JWTs for protected endpoints.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CORS configuration is delegated to CorsConfig (a separate bean/class).
                .cors(Customizer.withDefaults())

                // If you decide to use cookies (HttpOnly) for JWT storage, enable CSRF and configure token handling accordingly.
                .csrf(csrf -> csrf.disable())

                // We want a stateless REST API secured by JWTs.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Exception handling can be further customized here (access denied handlers, etc.)
                .exceptionHandling(ex -> ex)

                // Authorize requests - keep these rules minimal and prefer method-level security for fine-grained control.
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to authentication endpoints
                        .requestMatchers("/api/auth/**").permitAll()

                        // Allow public product browsing (GET). Controllers should secure write operations.
                        .requestMatchers("/api/products/**").permitAll()

                        // Allow swagger / actuator if you add them later (uncomment if needed)
                        // .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                );

        // Register JWT filter before UsernamePasswordAuthenticationFilter in the chain.
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
