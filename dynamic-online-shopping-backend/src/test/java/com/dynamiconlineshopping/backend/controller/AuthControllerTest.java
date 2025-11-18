package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.AuthRequest;
import com.dynamiconlineshopping.backend.dto.RegisterRequest;
import com.dynamiconlineshopping.backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)  // Disable JwtAuthFilter completely
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;   // Only dependency required

    @Test
    void testRegisterUser() throws Exception {
        RegisterRequest req = new RegisterRequest("test", "test@test.com", "password");
        AuthRequest resp = new AuthRequest("User registered", null);

        Mockito.when(authService.register(Mockito.any()))
                .thenReturn(resp);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                          {
                            "name": "test",
                            "email": "test@test.com",
                            "password": "password"
                          }
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered"));
    }
}
