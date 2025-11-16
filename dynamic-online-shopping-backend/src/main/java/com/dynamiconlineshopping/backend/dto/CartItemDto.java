package com.dynamiconlineshopping.backend.dto;

import lombok.*;

/**
 * CartItemDto - for cart operations.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDto {
    private Long id;
    private Long productId;
    private Integer quantity;
    private ProductDto product; // optional snapshot
}
