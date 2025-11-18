package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.ProductDto;
import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(1L)
                .title("Phone")
                .description("Nice")
                .price(100.0)
                .stock(5)
                .sku("SKU1")
                .imageUrl("u")
                .build();
    }

    @Test
    void getAll_returnsDtos() {
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductDto> out = productService.getAll();
        assertThat(out).hasSize(1);
        assertThat(out.get(0).getTitle()).isEqualTo("Phone");
    }

    @Test
    void getById_whenNotFound_throws() {
        when(productRepository.findById(2L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> productService.getById(2L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void create_savesAndReturnsDto() {
        ProductDto dto = ProductDto.builder().title("New").price(50.0).build();
        Product toSave = Product.builder().title("New").price(50.0).build();
        Product saved = Product.builder().id(2L).title("New").price(50.0).build();

        when(productRepository.save(any(Product.class))).thenReturn(saved);

        ProductDto out = productService.create(dto);
        assertThat(out.getId()).isEqualTo(2L);
        assertThat(out.getTitle()).isEqualTo("New");
        verify(productRepository).save(any());
    }

    @Test
    void update_whenNotFound_throws() {
        ProductDto dto = ProductDto.builder().title("X").build();
        when(productRepository.findById(5L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> productService.update(5L, dto))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void update_success_updatesFields() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        ProductDto dto = ProductDto.builder().title("Updated").description("d").price(120.0).stock(3).sku("S2").imageUrl("i").build();
        ProductDto out = productService.update(1L, dto);
        assertThat(out.getTitle()).isEqualTo("Updated");
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void delete_whenNotFound_throws() {
        when(productRepository.findById(9L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> productService.delete(9L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void delete_success_deletes() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        doNothing().when(productRepository).delete(any(Product.class));
        productService.delete(1L);
        verify(productRepository).delete(product);
    }
}
