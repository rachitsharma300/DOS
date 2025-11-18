package com.dynamiconlineshopping.backend.controller;

import com.dynamiconlineshopping.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * PaymentController - minimal Razorpay flow endpoints.
 */
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order/{orderId}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> createRazorpayOrder(@PathVariable Long orderId) {
        try {
            return ResponseEntity.ok(paymentService.createRazorpayOrder(orderId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to create payment order",
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> payload) {
        try {
            return ResponseEntity.ok(paymentService.verifyPayment(payload));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Payment verification failed",
                    "message", e.getMessage()
            ));
        }
    }
}