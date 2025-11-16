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
        return productRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ProductDto getById(Long id) {
        Product p = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return toDto(p);
    }

    @Override
    public ProductDto create(ProductDto dto) {
        Product saved = productRepository.save(toEntity(dto));
        return toDto(saved);
    }

    @Override
    public ProductDto update(Long id, ProductDto dto) {
        Product existing = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setStock(dto.getStock());
        existing.setSku(dto.getSku());
        existing.setImageUrl(dto.getImageUrl());
        Product updated = productRepository.save(existing);
        return toDto(updated);
    }

    @Override
    public void delete(Long id) {
        Product existing = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.delete(existing);
    }
}
