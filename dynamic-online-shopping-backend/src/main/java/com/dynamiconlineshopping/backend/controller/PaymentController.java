package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * PaymentController - minimal Razorpay flow endpoints.
 */
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order/{orderId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> createRazorpayOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.createRazorpayOrder(orderId));
    }

    @PostMapping("/verify")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> verifyPayment(@RequestBody String payload) {
        // payload contains signature/razorpay_payment_id/razorpay_order_id
        return ResponseEntity.ok(paymentService.verifyPayment(payload));
    }
}
