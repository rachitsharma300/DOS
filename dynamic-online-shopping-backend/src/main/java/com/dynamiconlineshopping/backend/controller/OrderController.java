package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponseDto> placeOrder() {
        return ResponseEntity.status(201).body(orderService.placeOrderForCurrentUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> listOrders() {
        return ResponseEntity.ok(orderService.listOrdersForCurrentUser());
    }
}