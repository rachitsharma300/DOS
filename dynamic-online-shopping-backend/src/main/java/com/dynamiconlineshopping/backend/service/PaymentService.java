package com.dynamiconlineshopping.backend.service;

import java.util.Map;

/**
 * PaymentService - handles payment gateway integration.
 */
public interface PaymentService {
    Object createRazorpayOrder(Long orderId);
    Object verifyPayment(Map<String, String> payload);
}
