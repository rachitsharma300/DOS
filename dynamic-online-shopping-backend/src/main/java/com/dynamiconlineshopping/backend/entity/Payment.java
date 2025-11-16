package com.dynamiconlineshopping.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Payment entity to store gateway responses.
 */
@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Order order;

    private String provider; // e.g., RAZORPAY

    private String providerPaymentId;

    private String providerOrderId;

    private Double amount;

    private String status;

    private Instant paidAt;
}
