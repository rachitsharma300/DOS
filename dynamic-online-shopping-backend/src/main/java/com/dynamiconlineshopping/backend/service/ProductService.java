package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.ProductDto;

import java.util.List;

/**
 * ProductService - product business operations.
 */
public interface ProductService {
    List<ProductDto> getAll();
    ProductDto getById(Long id);
    ProductDto create(ProductDto dto);
    ProductDto update(Long id, ProductDto dto);
    void delete(Long id);
}
