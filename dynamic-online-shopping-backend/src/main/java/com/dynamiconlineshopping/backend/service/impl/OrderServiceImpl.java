package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.CartItemDto;
import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.entity.CartItem;
import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.CartRepository;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import com.dynamiconlineshopping.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * OrderServiceImpl - place order from cart and list orders.
 */
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(principal).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private OrderResponseDto toDto(Order o) {
        List<CartItemDto> items = cartRepository.findByUser(o.getUser()).stream().map(c -> CartItemDto.builder()
                .id(c.getId())
                .productId(c.getProduct().getId())
                .quantity(c.getQuantity())
                .build()).collect(Collectors.toList());

        return OrderResponseDto.builder()
                .id(o.getId())
                .totalAmount(o.getTotalAmount())
                .status(o.getStatus())
                .createdAt(o.getCreatedAt())
                .items(items)
                .razorpayOrderId(o.getRazorpayOrderId())
                .build();
    }

    @Override
    public OrderResponseDto placeOrderForCurrentUser() {
        User user = getCurrentUser();
        List<CartItem> items = cartRepository.findByUser(user);
        if (items.isEmpty()) {
            throw new ResourceNotFoundException("Cart is empty");
        }
        double total = items.stream().mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity()).sum();
        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .status(OrderStatus.PENDING)
                .createdAt(Instant.now())
                .build();
        Order saved = orderRepository.save(order);
        // optionally clear cart
        cartRepository.deleteAll(items);
        return toDto(saved);
    }

    @Override
    public OrderResponseDto getById(Long id) {
        Order o = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return toDto(o);
    }

    @Override
    public List<OrderResponseDto> listOrdersForCurrentUser() {
        User user = getCurrentUser();
        return orderRepository.findByUser(user).stream().map(this::toDto).collect(Collectors.toList());
    }
}
