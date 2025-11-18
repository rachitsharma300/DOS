package com.dynamiconlineshopping.backend.enums;

/**
 * Order status enum.
 */
public enum OrderStatus {
    PENDING,        // Order placed, payment pending
    PAID,           // Payment successful
    PROCESSING,     // Preparing for shipment
    SHIPPED,        // Out for delivery
    DELIVERED,      // Order delivered
    CANCELLED       // Order cancelled
}
