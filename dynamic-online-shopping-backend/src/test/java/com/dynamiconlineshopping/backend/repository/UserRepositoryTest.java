package com.dynamiconlineshopping.backend.repository;

import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByEmail() {
        User user = new User();
        user.setEmail("test@gmail.com");
        user.setRole(Role.USER);
        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("test@gmail.com");
        assertThat(found).isPresent();
    }

    @Test
    void testCountByRole() {
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setRole(Role.ADMIN);

        User user = new User();
        user.setEmail("user@gmail.com");
        user.setRole(Role.USER);

        userRepository.save(admin);
        userRepository.save(user);

        long adminCount = userRepository.countByRole(Role.ADMIN);
        assertThat(adminCount).isEqualTo(1);
    }
}
