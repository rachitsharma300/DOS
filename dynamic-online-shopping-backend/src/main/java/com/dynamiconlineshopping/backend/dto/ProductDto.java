package com.dynamiconlineshopping.backend.dto;

import lombok.*;

/**
 * ProductDto - DTO for API responses/requests.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer stock;
    private String sku;
    private String imageUrl;
}
