package com.dynamiconlineshopping.backend.dto;

import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import lombok.*;

import java.time.Instant;
import java.util.List;

/**
 * OrderResponseDto - order details returned to client.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private Double totalAmount;
    private OrderStatus status;
    private Instant createdAt;
    private List<CartItemDto> items;
    private String razorpayOrderId;
    private User user;
}
