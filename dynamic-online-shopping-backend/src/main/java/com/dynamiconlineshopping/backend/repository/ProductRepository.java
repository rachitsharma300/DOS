package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ProductRepository.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
