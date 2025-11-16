package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * OrderRepository.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
