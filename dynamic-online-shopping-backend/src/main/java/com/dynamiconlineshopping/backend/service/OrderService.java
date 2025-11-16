package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;

import java.util.List;

/**
 * OrderService - place and manage orders.
 */
public interface OrderService {
    OrderResponseDto placeOrderForCurrentUser();
    OrderResponseDto getById(Long id);
    List<OrderResponseDto> listOrdersForCurrentUser();
}
