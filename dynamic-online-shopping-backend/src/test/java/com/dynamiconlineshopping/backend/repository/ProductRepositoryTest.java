package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void testSaveAndFind() {
        Product p = new Product();
        p.setTitle("Laptop");
        productRepository.save(p);

        Product saved = productRepository.findById(p.getId()).orElse(null);

        assertThat(saved).isNotNull();
        assertThat(saved.getTitle()).isEqualTo("Laptop");
    }

    @Test
    void testDeleteProduct() {
        Product p = new Product();
        p.setTitle("Mouse");
        productRepository.save(p);

        productRepository.delete(p);

        assertThat(productRepository.findById(p.getId())).isNotPresent();
    }
}
