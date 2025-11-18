package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUser() {
        User user = new User();
        user.setEmail("test@gmail.com");
        userRepository.save(user);

        Order order = new Order();
        order.setUser(user);
        orderRepository.save(order);

        List<Order> result = orderRepository.findByUser(user);
        assertThat(result).hasSize(1);
    }

    @Test
    void testFindByRazorpayOrderId() {
        Order order = new Order();
        order.setRazorpayOrderId("xyz123");
        orderRepository.save(order);

        Optional<Order> result = orderRepository.findByRazorpayOrderId("xyz123");
        assertThat(result).isPresent();
    }

    @Test
    void testFindByStatus() {
        Order order = new Order();
        order.setStatus(OrderStatus.SHIPPED);
        orderRepository.save(order);

        List<Order> result = orderRepository.findByStatus(OrderStatus.SHIPPED);
        assertThat(result).hasSize(1);
    }

    @Test
    void testFindTop5ByOrderByCreatedAtDesc() {
        for (int i = 1; i <= 6; i++) {
            Order o = new Order();
            o.setCreatedAt(Instant.now());
            orderRepository.save(o);
        }

        List<Order> orders = orderRepository.findTop5ByOrderByCreatedAtDesc();
        assertThat(orders).hasSize(5);
    }
}
