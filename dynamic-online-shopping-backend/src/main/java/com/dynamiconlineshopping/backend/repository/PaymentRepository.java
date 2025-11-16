package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PaymentRepository.
 */
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
