package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.Payment;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class PaymentServiceImplTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @BeforeEach
    void setUp() {
        // set secret used for HMAC in service via Reflection
        ReflectionTestUtils.setField(paymentService, "razorpayKeySecret", "testsecret");
        ReflectionTestUtils.setField(paymentService, "razorpayKeyId", "testkey");
    }

    // helper to compute HMAC SHA256 hex (same logic as service)
    private String computeHmacHex(String data, String secret) throws Exception {
        javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
        javax.crypto.spec.SecretKeySpec spec = new javax.crypto.spec.SecretKeySpec(secret.getBytes(java.nio.charset.StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(spec);
        byte[] hmac = mac.doFinal(data.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : hmac) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) sb.append('0');
            sb.append(hex);
        }
        return sb.toString();
    }

    @Test
    void createRazorpayOrder_whenOrderNotFound_throws() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> paymentService.createRazorpayOrder(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Order not found");
    }

    @Test
    void verifyPayment_success_updatesOrderAndSavesPayment() throws Exception {
        // prepare order
        Order order = Order.builder().id(50L).razorpayOrderId("rp_123").totalAmount(123.0).status(OrderStatus.PENDING).build();
        when(orderRepository.findByRazorpayOrderId("rp_123")).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));
        when(paymentRepository.save(any(Payment.class))).thenAnswer(i -> i.getArgument(0));

        String paymentId = "pay_999";
        String orderId = "rp_123";
        String data = orderId + "|" + paymentId;
        String sig = computeHmacHex(data, "testsecret");

        Map<String, String> payload = Map.of(
                "razorpay_payment_id", paymentId,
                "razorpay_order_id", orderId,
                "razorpay_signature", sig
        );

        Object res = paymentService.verifyPayment(payload);
        assertThat(res).isInstanceOf(Map.class);
        Map<?, ?> out = (Map<?, ?>) res;
        assertThat(out.get("status")).isEqualTo("success");
        assertThat(out.get("orderId")).isEqualTo(50L);

        // verify order status updated to PAID
        assertThat(order.getStatus()).isEqualTo(OrderStatus.PAID);
        verify(paymentRepository).save(any(Payment.class));
    }

    @Test
    void verifyPayment_whenSignatureMismatch_throws() {
        Order order = Order.builder().id(51L).razorpayOrderId("rp_bad").totalAmount(10.0).build();
        when(orderRepository.findByRazorpayOrderId("rp_bad")).thenReturn(Optional.of(order));

        Map<String, String> payload = Map.of(
                "razorpay_payment_id", "p",
                "razorpay_order_id", "rp_bad",
                "razorpay_signature", "invalid"
        );

        assertThatThrownBy(() -> paymentService.verifyPayment(payload))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Payment verification failed");
    }
}
