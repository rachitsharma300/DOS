package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);

    // METHODS FOR ADMIN
    List<Order> findByStatus(OrderStatus status);
    List<Order> findTop5ByOrderByCreatedAtDesc();
}