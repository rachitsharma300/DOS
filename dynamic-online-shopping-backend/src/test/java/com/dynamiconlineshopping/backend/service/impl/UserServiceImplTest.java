package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.UserDto;
import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void getAllUsers_returnsDtos() {
        User u = User.builder().id(1L).email("a@a.com").fullName("A").role(Role.CUSTOMER).build();
        when(userRepository.findAll()).thenReturn(List.of(u));

        List<UserDto> out = userService.getAllUsers();
        assertThat(out).hasSize(1);
        assertThat(out.get(0).getEmail()).isEqualTo("a@a.com");
    }

    @Test
    void getUserById_whenNotFound_throws() {
        when(userRepository.findById(5L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> userService.getUserById(5L)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void updateUserRole_success_changesRole() {
        User u = User.builder().id(2L).email("b@b.com").role(Role.CUSTOMER).build();
        when(userRepository.findById(2L)).thenReturn(Optional.of(u));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        UserDto out = userService.updateUserRole(2L, "ADMIN");
        assertThat(out.getRole()).isEqualTo(Role.ADMIN);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void getDashboardStats_returnsExpectedMap() {
        when(userRepository.count()).thenReturn(10L);
        when(productRepository.count()).thenReturn(20L);
        when(orderRepository.count()).thenReturn(5L);
        when(userRepository.countByRole(Role.ADMIN)).thenReturn(1L);
        when(userRepository.countByRole(Role.CUSTOMER)).thenReturn(9L);

        Order paidOrder = Order.builder().id(1L).status(OrderStatus.PAID).totalAmount(100.0).createdAt(Instant.now()).build();
        Order other = Order.builder().id(2L).status(OrderStatus.PENDING).totalAmount(50.0).createdAt(Instant.now()).build();
        when(orderRepository.findAll()).thenReturn(List.of(paidOrder, other));

        Order recent = Order.builder().id(3L).createdAt(Instant.now()).totalAmount(10.0).build();
        when(orderRepository.findTop5ByOrderByCreatedAtDesc()).thenReturn(List.of(recent));

        Map<String, Object> stats = userService.getDashboardStats();
        assertThat(stats.get("totalUsers")).isEqualTo(10L);
        assertThat(stats.get("totalProducts")).isEqualTo(20L);
        assertThat(stats.get("totalOrders")).isEqualTo(5L);
        assertThat(stats.get("totalRevenue")).isEqualTo(100.0);
        assertThat(stats).containsKeys("usersByRole", "recentOrders");
    }
}
