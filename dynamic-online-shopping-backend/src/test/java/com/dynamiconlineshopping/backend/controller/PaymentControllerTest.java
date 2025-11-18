package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.config.JwtAuthFilter;
import com.dynamiconlineshopping.backend.config.JwtUtil;
import com.dynamiconlineshopping.backend.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PaymentController.class)
@AutoConfigureMockMvc(addFilters = false) // 🚨 disables Spring Security filters in test
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentService paymentService;

    // Mock JWT beans so Spring won't try to create them
    @MockBean
    private JwtAuthFilter jwtAuthFilter;

    @MockBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreatePaymentOrder() throws Exception {
        Mockito.when(paymentService.createRazorpayOrder(1L))
                .thenReturn(Map.of("orderId", "123XYZ"));

        mockMvc.perform(post("/api/payments/create-order/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testVerifyPayment() throws Exception {
        Mockito.when(paymentService.verifyPayment(any(Map.class)))
                .thenReturn("Payment Success");

        mockMvc.perform(post("/api/payments/verify")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("signature", "abc123"))))
                .andExpect(status().isOk());
    }
}
