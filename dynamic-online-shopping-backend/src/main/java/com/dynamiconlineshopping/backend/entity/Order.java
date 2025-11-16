package com.dynamiconlineshopping.backend.entity;

import com.dynamiconlineshopping.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Order entity (simplified).
 */
@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Instant createdAt;

    private String razorpayOrderId; // for payment association
}
