package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.enums.OrderStatus;

import java.util.List;

/**
 * OrderService - place and manage orders.
 */
public interface OrderService {
    OrderResponseDto placeOrderForCurrentUser();
    OrderResponseDto getById(Long id);
    List<OrderResponseDto> listOrdersForCurrentUser();

    // ADMIN METHODS
    List<OrderResponseDto> getAllOrders();
    List<OrderResponseDto> getOrdersByStatus(OrderStatus status);
    OrderResponseDto updateOrderStatus(Long orderId, OrderStatus status);

}
