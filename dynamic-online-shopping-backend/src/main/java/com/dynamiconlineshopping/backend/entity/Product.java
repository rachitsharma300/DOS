package com.dynamiconlineshopping.backend.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Product entity.
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private Double price;

    private Integer stock;

    private String sku;

    private String imageUrl;
}
