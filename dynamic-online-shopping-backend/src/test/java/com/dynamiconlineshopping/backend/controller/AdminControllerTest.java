package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.config.JwtAuthFilter;
import com.dynamiconlineshopping.backend.config.JwtUtil;
import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.dto.UserDto;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.service.OrderService;
import com.dynamiconlineshopping.backend.service.ProductService;
import com.dynamiconlineshopping.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
@AutoConfigureMockMvc(addFilters = false) // 🚀 disables security in test env
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Required mocks
    @MockBean private ProductService productService;
    @MockBean private OrderService orderService;
    @MockBean private UserService userService;

    // Mock Security Dependencies to avoid bean loading error
    @MockBean private JwtAuthFilter jwtAuthFilter;
    @MockBean private JwtUtil jwtUtil;

    @Test
    void testGetAllProducts() throws Exception {
        Mockito.when(productService.getAll()).thenReturn(List.of(new ProductDto()));

        mockMvc.perform(get("/api/admin/products"))
                .andExpect(status().isOk());
    }

    @Test
    void testCreateProduct() throws Exception {
        ProductDto dto = new ProductDto();
        Mockito.when(productService.create(any(ProductDto.class))).thenReturn(dto);

        mockMvc.perform(post("/api/admin/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateProduct() throws Exception {
        ProductDto dto = new ProductDto();
        Mockito.when(productService.update(eq(1L), any(ProductDto.class))).thenReturn(dto);

        mockMvc.perform(put("/api/admin/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteProduct() throws Exception {
        mockMvc.perform(delete("/api/admin/products/1"))
                .andExpect(status().isOk());
        Mockito.verify(productService).delete(1L);
    }

    @Test
    void testGetOrdersByStatus() throws Exception {
        Mockito.when(orderService.getOrdersByStatus(OrderStatus.PENDING))
                .thenReturn(List.of(new OrderResponseDto()));

        mockMvc.perform(get("/api/admin/orders/status/PENDING"))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateOrderStatus() throws Exception {
        OrderResponseDto response = new OrderResponseDto();
        Mockito.when(orderService.updateOrderStatus(eq(5L), eq(OrderStatus.DELIVERED))).thenReturn(response);

        mockMvc.perform(put("/api/admin/orders/5/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\": \"DELIVERED\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetAllUsers() throws Exception {
        Mockito.when(userService.getAllUsers()).thenReturn(List.of(new UserDto()));

        mockMvc.perform(get("/api/admin/users"))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateUserRole() throws Exception {
        UserDto dto = new UserDto();
        Mockito.when(userService.updateUserRole(eq(2L), eq("ADMIN"))).thenReturn(dto);

        mockMvc.perform(put("/api/admin/users/2/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"role\": \"ADMIN\"}"))
                .andExpect(status().isOk());
    }
}
