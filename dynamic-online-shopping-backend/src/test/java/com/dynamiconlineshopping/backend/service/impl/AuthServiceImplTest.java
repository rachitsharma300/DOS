package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.config.JwtUtil;
import com.dynamiconlineshopping.backend.dto.AuthRequest;
import com.dynamiconlineshopping.backend.dto.RegisterRequest;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import com.dynamiconlineshopping.backend.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class AuthServiceImplTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @BeforeEach
    void setup() {
    }

    // ========================= REGISTER TESTS ==============================

    @Test
    void register_whenEmailExists_shouldThrow() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("a@a.com");
        req.setName("A");
        req.setPassword("pass");

        when(userRepository.findByEmail("a@a.com")).thenReturn(Optional.of(new User()));

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Email already exists");

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_success_savesUser_andReturnsResponse() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("b@b.com");
        req.setName("B");
        req.setPassword("pass");

        when(userRepository.findByEmail("b@b.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("pass")).thenReturn("encoded-pass");

        // simulate auto-generated id
        doAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(42L);
            return u;
        }).when(userRepository).save(any(User.class));

        Object response = authService.register(req);

        assertThat(response).isInstanceOf(Map.class);
        Map<?, ?> result = (Map<?, ?>) response;

        assertThat(result.get("message")).isEqualTo("User registered successfully");
        assertThat(result.get("userId")).isEqualTo(42L);
        assertThat(result.get("email")).isEqualTo("b@b.com");

        verify(passwordEncoder).encode("pass");
        verify(userRepository).save(userCaptor.capture());

        User saved = userCaptor.getValue();
        assertThat(saved.getEmail()).isEqualTo("b@b.com");
        assertThat(saved.getFullName()).isEqualTo("B");
        assertThat(saved.getRole()).isEqualTo(Role.CUSTOMER);
    }

    // =========================== LOGIN TESTS ===============================

    @Test
    void login_whenInvalidCredentials_shouldThrow() {
        AuthRequest req = new AuthRequest();
        req.setEmail("x@x.com");
        req.setPassword("wrong");

        doThrow(new RuntimeException("Bad creds"))
                .when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Bad creds");

        verify(userRepository, never()).findByEmail(anyString());
    }

    @Test
    void login_success_shouldReturnTokenMap() {
        AuthRequest req = new AuthRequest();
        req.setEmail("c@c.com");
        req.setPassword("pass");

        User user = User.builder()
                .id(10L)
                .email("c@c.com")
                .password("encoded")
                .fullName("C User")
                .role(Role.ADMIN)
                .build();

        // authentication mock returns valid Authentication object
        Authentication mockAuth = new UsernamePasswordAuthenticationToken("c@c.com", null);
        when(authenticationManager.authenticate(any())).thenReturn(mockAuth);

        when(userRepository.findByEmail("c@c.com")).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken("c@c.com", "ADMIN")).thenReturn("tok-123");

        Object response = authService.login(req);

        assertThat(response).isInstanceOf(Map.class);
        Map<?, ?> result = (Map<?, ?>) response;

        assertThat(result.get("token")).isEqualTo("tok-123");
        assertThat(result.get("email")).isEqualTo("c@c.com");
        assertThat(result.get("role")).isEqualTo(Role.ADMIN);
        assertThat(result.get("name")).isEqualTo("C User");
    }

    // ===================== loadUserByUsername TESTS ========================

    @Test
    void loadUserByUsername_notFound_shouldThrow() {
        when(userRepository.findByEmail("not@found.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.loadUserByUsername("not@found.com"))
                .isInstanceOf(UsernameNotFoundException.class);
    }

    @Test
    void loadUserByUsername_found_shouldReturnUserDetails() {
        User user = User.builder()
                .email("d@d.com")
                .password("pwd")
                .role(Role.CUSTOMER)
                .build();

        when(userRepository.findByEmail("d@d.com")).thenReturn(Optional.of(user));

        var ud = authService.loadUserByUsername("d@d.com");

        assertThat(ud.getUsername()).isEqualTo("d@d.com");
        assertThat(ud.getPassword()).isEqualTo("pwd");
        assertThat(ud.getAuthorities()).isNotEmpty();
    }
}
