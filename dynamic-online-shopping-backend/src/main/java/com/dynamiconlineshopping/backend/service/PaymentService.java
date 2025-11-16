package com.dynamiconlineshopping.backend.service;

/**
 * PaymentService - handles payment gateway integration.
 */
public interface PaymentService {
    Object createRazorpayOrder(Long orderId);
    Object verifyPayment(String payload);
}
