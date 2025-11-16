package com.dynamiconlineshopping.backend.config;

import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createUsers();
        createProducts();
        System.out.println("✅ Data seeding completed successfully!");
    }

    private void createUsers() {
        if (userRepository.count() == 0) {
            List<User> users = Arrays.asList(
                    User.builder()
                            .email("admin@shop.com")
                            .password(passwordEncoder.encode("admin123"))
                            .fullName("Admin User")
                            .role(Role.ADMIN)
                            .build(),

                    User.builder()
                            .email("customer@shop.com")
                            .password(passwordEncoder.encode("customer123"))
                            .fullName("John Customer")
                            .role(Role.CUSTOMER)
                            .build(),

                    User.builder()
                            .email("mohan@shop.com")
                            .password(passwordEncoder.encode("mohan123"))
                            .fullName("Mohan Kumar")
                            .role(Role.CUSTOMER)
                            .build()
            );

            userRepository.saveAll(users);
            System.out.println("👥 Users created: Admin, Customer");
        }
    }

    private void createProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                    Product.builder()
                            .title("iPhone 15 Pro")
                            .description("Latest Apple iPhone with A17 Pro chip")
                            .price(134900.00)
                            .stock(50)
                            .sku("APPLE-IP15-PRO-256")
                            .imageUrl("https://tinyurl.com/iphone15-pro-img")
                            .build(),

                    Product.builder()
                            .title("Samsung Galaxy S24 Ultra")
                            .description("Samsung flagship with S Pen and AI features")
                            .price(129999.00)
                            .stock(35)
                            .sku("SAMSUNG-S24-ULTRA-512")
                            .imageUrl("https://tinyurl.com/s24-ultra-img")
                            .build(),

                    Product.builder()
                            .title("MacBook Air M3")
                            .description("Apple MacBook with M3 chip, 13-inch")
                            .price(114900.00)
                            .stock(20)
                            .sku("APPLE-MBA-M3-256")
                            .imageUrl("https://tinyurl.com/macbook-m3-img")
                            .build(),

                    Product.builder()
                            .title("Sony WH-1000XM5")
                            .description("Industry leading noise canceling headphones")
                            .price(29990.00)
                            .stock(100)
                            .sku("SONY-WH1000XM5-BLK")
                            .imageUrl("https://tinyurl.com/sony-xm5-img")
                            .build(),

                    Product.builder()
                            .title("Nike Air Jordan 1")
                            .description("Classic basketball sneakers - Red/Black")
                            .price(12995.00)
                            .stock(75)
                            .sku("NIKE-AJ1-RED-BLK")
                            .imageUrl("https://tinyurl.com/nike-aj1-img")
                            .build(),

                    Product.builder()
                            .title("Amazon Echo Dot 5th Gen")
                            .description("Smart speaker with Alexa - Charcoal")
                            .price(5499.00)
                            .stock(200)
                            .sku("AMAZON-ECHO-DOT-5")
                            .imageUrl("https://tinyurl.com/echo-dot-5-img")
                            .build(),

                    Product.builder()
                            .title("Canon EOS R6 Mark II")
                            .description("Full-frame mirrorless camera")
                            .price(189995.00)
                            .stock(15)
                            .sku("CANON-EOS-R6-M2")
                            .imageUrl("https://tinyurl.com/canon-r6m2-img")
                            .build(),

                    Product.builder()
                            .title("PlayStation 5 Console")
                            .description("Next-gen gaming console with DualSense controller")
                            .price(54990.00)
                            .stock(30)
                            .sku("SONY-PS5-STD")
                            .imageUrl("https://tinyurl.com/ps5-console-img")
                            .build(),

                    Product.builder()
                            .title("Dell XPS 13 Plus")
                            .description("Ultra-thin laptop with OLED display")
                            .price(159990.00)
                            .stock(25)
                            .sku("DELL-XPS13-PLUS-512")
                            .imageUrl("https://tinyurl.com/dell-xps13-img")
                            .build(),

                    Product.builder()
                            .title("Apple Watch Series 9")
                            .description("Smartwatch with temperature sensing")
                            .price(41900.00)
                            .stock(60)
                            .sku("APPLE-WATCH-S9-45")
                            .imageUrl("https://tinyurl.com/apple-watch-s9-img")
                            .build()
            );

            productRepository.saveAll(products);
            System.out.println("📦 Products created: 10 sample products");
        }
    }
}