package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ProductServiceImpl - basic CRUD.
 */
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private ProductDto toDto(Product p) {
        return ProductDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(p.getPrice())
                .stock(p.getStock())
                .sku(p.getSku())
                .imageUrl(p.getImageUrl())
                .build();
    }

    private Product toEntity(ProductDto dto) {
        return Product.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .sku(dto.getSku())
                .imageUrl(dto.getImageUrl())
                .build();
    }

    @Override
    public List<ProductDto> getAll() {
        try {
            return productRepository.findAll().stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public ProductDto getById(Long id) {
        Product p = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return toDto(p);
    }

    @Override
    public ProductDto create(ProductDto dto) {
        try {
            Product product = toEntity(dto);
            Product saved = productRepository.save(product);
            return toDto(saved);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create product: " + e.getMessage());
        }
    }

    @Override
    public ProductDto update(Long id, ProductDto dto) {
        try {
            Product existing = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            // Update fields
            existing.setTitle(dto.getTitle());
            existing.setDescription(dto.getDescription());
            existing.setPrice(dto.getPrice());
            existing.setStock(dto.getStock());
            existing.setSku(dto.getSku());
            existing.setImageUrl(dto.getImageUrl());

            Product updated = productRepository.save(existing);
            return toDto(updated);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update product: " + e.getMessage());
        }
    }

    @Override
    public void delete(Long id) {
        try {
            Product existing = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            productRepository.delete(existing);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete product: " + e.getMessage());
        }
    }
}