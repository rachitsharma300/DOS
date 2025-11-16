package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * OrderController - endpoints for placing and viewing orders.
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponseDto> placeOrder() {
        return ResponseEntity.status(201).body(orderService.placeOrderForCurrentUser());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('CUSTOMER','ADMIN')")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('CUSTOMER','ADMIN')")
    public ResponseEntity<List<OrderResponseDto>> listOrders() {
        return ResponseEntity.ok(orderService.listOrdersForCurrentUser());
    }
}
