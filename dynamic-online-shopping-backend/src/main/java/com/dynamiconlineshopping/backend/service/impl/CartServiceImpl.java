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
import com.dynamiconlineshopping.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * CartServiceImpl - simple cart logic for current user.
 */
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(principal).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private CartItemDto toDto(CartItem c) {
        Product p = c.getProduct();
        ProductDto pd = ProductDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(p.getPrice())
                .stock(p.getStock())
                .sku(p.getSku())
                .imageUrl(p.getImageUrl())
                .build();
        return CartItemDto.builder()
                .id(c.getId())
                .productId(p.getId())
                .quantity(c.getQuantity())
                .product(pd)
                .build();
    }

    @Override
    public List<CartItemDto> getCartForCurrentUser() {
        User user = getCurrentUser();
        return cartRepository.findByUser(user).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<CartItemDto> addItem(CartItemDto dto) {
        User user = getCurrentUser();
        Product product = productRepository.findById(dto.getProductId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        CartItem item = CartItem.builder().user(user).product(product).quantity(dto.getQuantity()).build();
        cartRepository.save(item);
        return getCartForCurrentUser();
    }

    @Override
    public List<CartItemDto> updateItem(Long cartItemId, CartItemDto dto) {
        CartItem item = cartRepository.findById(cartItemId).orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));
        item.setQuantity(dto.getQuantity());
        cartRepository.save(item);
        return getCartForCurrentUser();
    }

    @Override
    public List<CartItemDto> removeItem(Long cartItemId) {
        CartItem item = cartRepository.findById(cartItemId).orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));
        cartRepository.delete(item);
        return getCartForCurrentUser();
    }
}
