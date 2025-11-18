package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.CartItemDto;
import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.entity.CartItem;
import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.CartRepository;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class CartServiceImplTest {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CartServiceImpl cartService;

    private final String EMAIL = "me@me.com";

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder().id(11L).email(EMAIL).build();

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
    void getCartForCurrentUser_returnsDtos() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));

        Product p = Product.builder().id(1L).title("T").price(10.0).stock(5).sku("s").imageUrl("u").build();
        CartItem c = CartItem.builder().id(2L).user(user).product(p).quantity(2).build();
        when(cartRepository.findByUser(user)).thenReturn(List.of(c));

        List<CartItemDto> out = cartService.getCartForCurrentUser();
        assertThat(out).hasSize(1);
        assertThat(out.get(0).getQuantity()).isEqualTo(2);
    }

    @Test
    void addItem_whenProductMissing_throws() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        CartItemDto dto = CartItemDto.builder().productId(99L).quantity(1).build();
        assertThatThrownBy(() -> cartService.addItem(dto)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void addItem_success_addsAndReturnsCart() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        Product p = Product.builder().id(1L).title("X").price(5.0).build();
        when(productRepository.findById(1L)).thenReturn(Optional.of(p));

        // cartRepo.save should capture; getCartForCurrentUser will call findByUser -> return the saved item
        CartItem saved = CartItem.builder().id(7L).user(user).product(p).quantity(3).build();
        when(cartRepository.save(any(CartItem.class))).thenReturn(saved);
        when(cartRepository.findByUser(user)).thenReturn(List.of(saved));

        CartItemDto dto = CartItemDto.builder().productId(1L).quantity(3).build();
        List<CartItemDto> out = cartService.addItem(dto);
        assertThat(out).hasSize(1);
        assertThat(out.get(0).getProductId()).isEqualTo(1L);
    }

    @Test
    void updateItem_whenNotFound_throws() {
        when(cartRepository.findById(5L)).thenReturn(Optional.empty());
        CartItemDto dto = CartItemDto.builder().quantity(2).build();
        assertThatThrownBy(() -> cartService.updateItem(5L, dto)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void updateItem_success_updatesAndReturns() {
        Product p = Product.builder().id(1L).title("X").price(5.0).build();
        CartItem existing = CartItem.builder().id(3L).product(p).quantity(1).build();
        when(cartRepository.findById(3L)).thenReturn(Optional.of(existing));
        doAnswer(inv -> { existing.setQuantity(4); return existing; }).when(cartRepository).save(existing);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(cartRepository.findByUser(user)).thenReturn(List.of(existing));

        CartItemDto dto = CartItemDto.builder().quantity(4).build();
        List<CartItemDto> out = cartService.updateItem(3L, dto);
        assertThat(out).hasSize(1);
        assertThat(out.get(0).getQuantity()).isEqualTo(4);
    }

    @Test
    void removeItem_whenNotFound_throws() {
        when(cartRepository.findById(8L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> cartService.removeItem(8L)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void removeItem_success_deletesAndReturns() {
        Product p = Product.builder().id(1L).title("X").price(5.0).build();
        CartItem item = CartItem.builder().id(4L).product(p).user(user).quantity(1).build();
        when(cartRepository.findById(4L)).thenReturn(Optional.of(item));
        doNothing().when(cartRepository).delete(item);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        when(cartRepository.findByUser(user)).thenReturn(List.of());

        List<CartItemDto> out = cartService.removeItem(4L);
        assertThat(out).isEmpty();
    }
}
