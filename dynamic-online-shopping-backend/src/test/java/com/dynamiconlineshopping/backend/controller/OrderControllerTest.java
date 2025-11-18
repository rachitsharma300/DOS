package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.service.OrderService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testPlaceOrder() throws Exception {
        Mockito.when(orderService.placeOrderForCurrentUser()).thenReturn(new OrderResponseDto());

        mockMvc.perform(post("/api/orders/place"))
                .andExpect(status().isCreated());
    }

    @Test
    void testGetOrder() throws Exception {
        Mockito.when(orderService.getById(1L)).thenReturn(new OrderResponseDto());

        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testListOrders() throws Exception {
        Mockito.when(orderService.listOrdersForCurrentUser()).thenReturn(List.of(new OrderResponseDto()));

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk());
    }
}
