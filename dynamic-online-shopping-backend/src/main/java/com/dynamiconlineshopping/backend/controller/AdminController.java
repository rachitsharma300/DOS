package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.dto.UserDto;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.service.OrderService;
import com.dynamiconlineshopping.backend.service.ProductService;
import com.dynamiconlineshopping.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final UserService userService;

    // ==================== PRODUCT MANAGEMENT ====================

    @GetMapping("/products")
    public List<ProductDto> getAllProductsAdmin() {
        return productService.getAll();
    }

    @PostMapping("/products")
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        return productService.create(productDto);
    }

    @PutMapping("/products/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        return productService.update(id, productDto);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }

    // ==================== ORDER MANAGEMENT ====================

    @GetMapping("/orders")
    public List<OrderResponseDto> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/orders/status/{status}")
    public List<OrderResponseDto> getOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(OrderStatus.valueOf(status.toUpperCase()));
    }

    @PutMapping("/orders/{orderId}/status")
    public OrderResponseDto updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        System.out.println("Updating order " + orderId + " to status: " + status);
        return orderService.updateOrderStatus(orderId, OrderStatus.valueOf(status.toUpperCase()));
    }

    // ==================== USER MANAGEMENT ====================

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{userId}")
    public UserDto getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/users/{userId}/role")
    public UserDto updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        String role = request.get("role");
        return userService.updateUserRole(userId, role);
    }

    // ==================== DASHBOARD STATS ====================

    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        return userService.getDashboardStats();
    }
}