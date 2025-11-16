package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.CartItemDto;

import java.util.List;

/**
 * CartService - cart operations for current user.
 */
public interface CartService {
    List<CartItemDto> getCartForCurrentUser();
    List<CartItemDto> addItem(CartItemDto dto);
    List<CartItemDto> updateItem(Long cartItemId, CartItemDto dto);
    List<CartItemDto> removeItem(Long cartItemId);
}
