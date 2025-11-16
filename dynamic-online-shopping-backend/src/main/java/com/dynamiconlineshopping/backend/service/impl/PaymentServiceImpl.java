package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.Payment;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.PaymentRepository;
import com.dynamiconlineshopping.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

/**
 * PaymentServiceImpl - lightweight Razorpay integration placeholder.
 *
 * NOTE: For Razorpay integration, add razorpay-java SDK, load API keys from properties,
 * and implement create/capture/verify using their API. Here we provide structure and placeholders.
 */
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public Object createRazorpayOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        // TODO: call Razorpay SDK to create order -> return order details for frontend to use razorpay checkout
        Map<String, Object> fakeResponse = Map.of(
                "razorpay_order_id", "fake_order_" + order.getId(),
                "amount", (int) Math.round(order.getTotalAmount() * 100)
        );
        order.setRazorpayOrderId((String) fakeResponse.get("razorpay_order_id"));
        orderRepository.save(order);
        return fakeResponse;
    }

    @Override
    public Object verifyPayment(String payload) {
        // TODO: parse payload, verify signature using razorpay secret, create Payment entity, mark Order as PAID
        // Placeholder:
        String fakePaymentId = "fake_pay_123";
        String fakeOrderId = "fake_order_1";
        Order order = orderRepository.findAll().stream().filter(o -> fakeOrderId.equals(o.getRazorpayOrderId())).findFirst().orElse(null);
        if (order != null) {
            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);
            Payment payment = Payment.builder()
                    .order(order)
                    .provider("RAZORPAY")
                    .providerOrderId(fakeOrderId)
                    .providerPaymentId(fakePaymentId)
                    .amount(order.getTotalAmount())
                    .status("PAID")
                    .paidAt(Instant.now())
                    .build();
            paymentRepository.save(payment);
            return Map.of("status", "ok");
        }
        return Map.of("status", "error");
    }
}
