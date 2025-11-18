package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.OrderResponseDto;
import com.dynamiconlineshopping.backend.entity.CartItem;
import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.CartRepository;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private final String EMAIL = "u@u.com";
    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder().id(12L).email(EMAIL).build();
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn(EMAIL);
        SecurityContext sc = mock(SecurityContext.class);
        when(sc.getAuthentication()).thenReturn(auth);
        SecurityContextHolder.setContext(sc);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void placeOrder_whenCartEmpty_throws() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(cartRepository.findByUser(user)).thenReturn(List.of());

        assertThatThrownBy(() -> orderService.placeOrderForCurrentUser())
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Cart is empty");
    }

    @Test
    void placeOrder_success_createsOrderAndEmptiesCart() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        Product p = Product.builder().id(2L).price(10.0).build();
        CartItem c = CartItem.builder().id(3L).product(p).quantity(2).user(user).build();
        when(cartRepository.findByUser(user)).thenReturn(List.of(c));

        Order saved = Order.builder().id(100L).user(user).totalAmount(20.0).status(OrderStatus.PENDING).createdAt(Instant.now()).build();
        when(orderRepository.save(any(Order.class))).thenReturn(saved);

        doNothing().when(cartRepository).deleteAll(anyList());

        OrderResponseDto dto = orderService.placeOrderForCurrentUser();
        assertThat(dto.getId()).isEqualTo(100L);
        assertThat(dto.getTotalAmount()).isEqualTo(20.0);

        verify(cartRepository).deleteAll(List.of(c));
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void getById_whenNotFound_throws() {
        when(orderRepository.findById(9L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> orderService.getById(9L)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void listOrdersForCurrentUser_returnsDtos() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        Order o = Order.builder().id(55L).user(user).totalAmount(5.0).status(OrderStatus.PENDING).createdAt(Instant.now()).build();
        when(orderRepository.findByUser(user)).thenReturn(List.of(o));

        List<OrderResponseDto> list = orderService.listOrdersForCurrentUser();
        assertThat(list).hasSize(1);
        assertThat(list.get(0).getId()).isEqualTo(55L);
    }

    @Test
    void getAllOrders_and_getOrdersByStatus_and_updateOrderStatus() {
        Order o1 = Order.builder().id(1L).status(OrderStatus.PENDING).totalAmount(10.0).build();
        when(orderRepository.findAll()).thenReturn(List.of(o1));
        when(orderRepository.findByStatus(OrderStatus.PENDING)).thenReturn(List.of(o1));
        when(orderRepository.findById(1L)).thenReturn(Optional.of(o1));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        var all = orderService.getAllOrders();
        assertThat(all).hasSize(1);

        var byStatus = orderService.getOrdersByStatus(OrderStatus.PENDING);
        assertThat(byStatus).hasSize(1);

        var updated = orderService.updateOrderStatus(1L, OrderStatus.DELIVERED);
        assertThat(updated.getStatus()).isEqualTo(OrderStatus.DELIVERED);
    }
}
