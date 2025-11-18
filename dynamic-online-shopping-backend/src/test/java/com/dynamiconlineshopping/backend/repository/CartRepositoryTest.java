package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.CartItem;
import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class CartRepositoryTest {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUser() {
        User user = new User();
        user.setEmail("aaa@gmail.com");
        userRepository.save(user);

        CartItem item = new CartItem();
        item.setUser(user);
        cartRepository.save(item);

        List<CartItem> cartItems = cartRepository.findByUser(user);
        assertThat(cartItems).hasSize(1);
    }

    @Test
    void testDeleteByUserAndProductId() {
        User user = new User();
        user.setEmail("bbb@gmail.com");
        userRepository.save(user);

        CartItem item = new CartItem();
        item.setUser(user);

        Product product = new Product();
        product.setTitle("Book");

        item.setProduct(product);
        cartRepository.save(item);

        cartRepository.deleteByUserAndProductId(user, item.getId());
        List<CartItem> cartItems = cartRepository.findByUser(user);
        assertThat(cartItems).isEmpty();
    }
}
