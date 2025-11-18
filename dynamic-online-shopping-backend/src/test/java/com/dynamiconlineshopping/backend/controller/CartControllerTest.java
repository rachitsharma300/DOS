package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.CartItemDto;
import com.dynamiconlineshopping.backend.service.CartService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CartController.class)
class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CartService cartService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetCart() throws Exception {
        Mockito.when(cartService.getCartForCurrentUser()).thenReturn(List.of(new CartItemDto()));

        mockMvc.perform(get("/api/cart"))
                .andExpect(status().isOk());
    }

    @Test
    void testAddToCart() throws Exception {
        CartItemDto dto = new CartItemDto();
        Mockito.when(cartService.addItem(any(CartItemDto.class)))
                .thenReturn(List.of(dto));

        mockMvc.perform(post("/api/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }

    @Test
    void testUpdateCartItem() throws Exception {
        CartItemDto dto = new CartItemDto();
        Mockito.when(cartService.updateItem(eq(1L), any(CartItemDto.class)))
                .thenReturn(List.of(dto));

        mockMvc.perform(put("/api/cart/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    @Test
    void testRemoveCartItem() throws Exception {
        Mockito.when(cartService.removeItem(1L)).thenReturn(List.of(new CartItemDto()));

        mockMvc.perform(delete("/api/cart/1"))
                .andExpect(status().isOk());
    }
}
