package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.dto.CartItemDto;
import com.dynamiconlineshopping.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CartController - manage customer's cart via DTOs.
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<CartItemDto>> getCart() {
        return ResponseEntity.ok(cartService.getCartForCurrentUser());
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<CartItemDto>> addToCart(@RequestBody CartItemDto dto) {
        return ResponseEntity.status(201).body(cartService.addItem(dto));
    }

    @PutMapping("/{cartItemId}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<CartItemDto>> updateCartItem(@PathVariable Long cartItemId, @RequestBody CartItemDto dto) {
        return ResponseEntity.ok(cartService.updateItem(cartItemId, dto));
    }

    @DeleteMapping("/{cartItemId}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<CartItemDto>> removeItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeItem(cartItemId));
    }
}
