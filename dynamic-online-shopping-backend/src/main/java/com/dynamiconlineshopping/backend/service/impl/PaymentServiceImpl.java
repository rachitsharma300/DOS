package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.Payment;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.PaymentRepository;
import com.dynamiconlineshopping.backend.service.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Override
    public Object createRazorpayOrder(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

            System.out.println("Creating Razorpay order for order ID: " + orderId + ", Amount: " + order.getTotalAmount());

            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject options = new JSONObject();
            options.put("amount", (int) (order.getTotalAmount() * 100)); // amount in paise
            options.put("currency", "INR");
            options.put("receipt", "order_" + order.getId());

            com.razorpay.Order razorpayOrder = razorpay.orders.create(options);

            // Save razorpay order ID to our order
            order.setRazorpayOrderId(razorpayOrder.get("id"));
            orderRepository.save(order);

            System.out.println("Razorpay order created: " + razorpayOrder.get("id"));

            return Map.of(
                    "razorpay_order_id", razorpayOrder.get("id").toString(),
                    "amount", Integer.parseInt(razorpayOrder.get("amount").toString()),
                    "currency", razorpayOrder.get("currency").toString(),
                    "key", razorpayKeyId
            );

        } catch (RazorpayException e) {
            System.err.println("Razorpay error: " + e.getMessage());
            throw new RuntimeException("Razorpay error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error creating Razorpay order: " + e.getMessage());
            throw new RuntimeException("Failed to create payment order: " + e.getMessage());
        }
    }

    @Override
    public Object verifyPayment(Map<String, String> payload) {
        try {
            System.out.println("Payment verification payload: " + payload);

            String razorpayPaymentId = payload.get("razorpay_payment_id");
            String razorpayOrderId = payload.get("razorpay_order_id");
            String razorpaySignature = payload.get("razorpay_signature");

            if (razorpayPaymentId == null || razorpayOrderId == null || razorpaySignature == null) {
                throw new RuntimeException("Missing payment verification data");
            }

            // Verify signature using HMAC SHA256
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            String generatedSignature = calculateHMAC(data, razorpayKeySecret);

            System.out.println("Data for HMAC: " + data);
            System.out.println("Generated signature: " + generatedSignature);
            System.out.println("Received signature: " + razorpaySignature);

            // Compare signatures securely
            if (!isEqual(generatedSignature, razorpaySignature)) {
                throw new RuntimeException("Payment verification failed: Invalid signature");
            }

            // Find order and update status
            Order order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                    .orElseThrow(() -> new RuntimeException("Order not found for Razorpay ID: " + razorpayOrderId));

            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);

            // Save payment record
            Payment payment = Payment.builder()
                    .order(order)
                    .provider("RAZORPAY")
                    .providerOrderId(razorpayOrderId)
                    .providerPaymentId(razorpayPaymentId)
                    .amount(order.getTotalAmount())
                    .status("PAID")
                    .paidAt(Instant.now())
                    .build();
            paymentRepository.save(payment);

            System.out.println("Payment verified successfully for order: " + order.getId());

            return Map.of(
                    "status", "success",
                    "message", "Payment verified successfully",
                    "orderId", order.getId()
            );

        } catch (Exception e) {
            System.err.println("Payment verification failed: " + e.getMessage());
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    // SECURE STRING COMPARISON
    private boolean isEqual(String a, String b) {
        return MessageDigest.isEqual(a.getBytes(StandardCharsets.UTF_8), b.getBytes(StandardCharsets.UTF_8));
    }

    // Manual HMAC SHA256 calculation for signature verification
    private String calculateHMAC(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            // Convert to hexadecimal (Razorpay expects hex)
            StringBuilder hexString = new StringBuilder();
            for (byte b : hmacBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();

        } catch (Exception e) {
            throw new RuntimeException("Error calculating HMAC: " + e.getMessage());
        }
    }
}