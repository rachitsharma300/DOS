package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.CartItem;
import com.dynamiconlineshopping.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * CartRepository.
 */
public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUserAndProductId(User user, Long productId);
}
