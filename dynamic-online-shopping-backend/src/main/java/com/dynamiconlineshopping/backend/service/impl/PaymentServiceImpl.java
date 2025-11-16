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
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject options = new JSONObject();
            options.put("amount", (int) (order.getTotalAmount() * 100)); // amount in paise
            options.put("currency", "INR");
            options.put("receipt", "order_" + order.getId());

            com.razorpay.Order razorpayOrder = razorpay.orders.create(options);

            // Save razorpay order ID to our order
            order.setRazorpayOrderId(razorpayOrder.get("id"));
            orderRepository.save(order);

            return Map.of(
                    "razorpay_order_id", razorpayOrder.get("id"),
                    "amount", razorpayOrder.get("amount"),
                    "currency", razorpayOrder.get("currency"),
                    "key", razorpayKeyId
            );

        } catch (RazorpayException e) {
            throw new RuntimeException("Razorpay error: " + e.getMessage());
        }
    }

    @Override
    public Object verifyPayment(String payload) {
        try {
            // Parse the payload (you'll get this from frontend after payment)
            JSONObject json = new JSONObject(payload);

            String razorpayPaymentId = json.getString("razorpay_payment_id");
            String razorpayOrderId = json.getString("razorpay_order_id");
            String razorpaySignature = json.getString("razorpay_signature");

            // Verify signature using HMAC SHA256
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            String generatedSignature = calculateHMAC(data, razorpayKeySecret);

            if (!generatedSignature.equals(razorpaySignature)) {
                throw new RuntimeException("Payment verification failed: Invalid signature");
            }

            // Find order and update status
            Order order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

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

            return Map.of("status", "success", "message", "Payment verified successfully");

        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    // Manual HMAC SHA256 calculation for signature verification
    private String calculateHMAC(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error calculating HMAC: " + e.getMessage());
        }
    }
}