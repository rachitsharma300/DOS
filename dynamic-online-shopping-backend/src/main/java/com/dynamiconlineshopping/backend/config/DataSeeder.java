package com.dynamiconlineshopping.backend.config;

import com.dynamiconlineshopping.backend.entity.Product;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import com.dynamiconlineshopping.backend.enums.OrderStatus;
import com.dynamiconlineshopping.backend.entity.Order;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
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
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        createUsers();
        createProducts();
        createSampleOrders();
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
                            .email("rachit@shop.com")
                            .password(passwordEncoder.encode("rachit"))
                            .fullName("Rachit Sharma")
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
                            .title("Samsung Galaxy S24 Ultra")
                            .description("6.8 inch Dynamic AMOLED, 200MP Camera, 5000mAh Battery")
                            .price(129999.00)
                            .stock(25)
                            .sku("SAM-S24U-512")
                            .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("iPhone 15 Pro Max")
                            .description("6.7 inch Super Retina XDR, Titanium design, A17 Pro chip")
                            .price(159900.00)
                            .stock(20)
                            .sku("APP-15PM-256")
                            .imageUrl("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("OnePlus 12")
                            .description("6.82 inch Fluid AMOLED, Snapdragon 8 Gen 3, 100W charging")
                            .price(69999.00)
                            .stock(40)
                            .sku("OP-12-256")
                            .imageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("MacBook Air M3")
                            .description("13.6 inch Liquid Retina, 8GB RAM, 256GB SSD")
                            .price(114900.00)
                            .stock(15)
                            .sku("MBA-M3-256")
                            .imageUrl("https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Dell Inspiron 15")
                            .description("15.6 inch FHD, Intel Core i5, 16GB RAM, 512GB SSD")
                            .price(64990.00)
                            .stock(30)
                            .sku("DEL-IN15-512")
                            .imageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Sony WH-1000XM5")
                            .description("Industry leading noise cancellation, 30hr battery")
                            .price(29990.00)
                            .stock(50)
                            .sku("SON-WH-XM5")
                            .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Samsung Galaxy Watch 6")
                            .description("44mm Bluetooth, Super AMOLED, Health monitoring")
                            .price(26999.00)
                            .stock(45)
                            .sku("SAM-GW6-44")
                            .imageUrl("https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("PlayStation 5")
                            .description("825GB SSD, 4K Gaming, DualSense controller")
                            .price(54990.00)
                            .stock(10)
                            .sku("SON-PS5-STD")
                            .imageUrl("https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Nike Air Force 1")
                            .description("White leather sneakers, comfortable cushioning")
                            .price(7495.00)
                            .stock(60)
                            .sku("NIKE-AF1-WHT")
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Adidas Ultraboost 22")
                            .description("Running shoes with Boost technology, primeblue")
                            .price(16999.00)
                            .stock(40)
                            .sku("ADI-UB22-BLK")
                            .imageUrl("https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Amazon Echo Dot 5th Gen")
                            .description("Smart speaker with Alexa, charcoal black")
                            .price(5499.00)
                            .stock(80)
                            .sku("AMZ-ED5-BLK")
                            .imageUrl("https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Google Nest Mini")
                            .description("Smart speaker with Google Assistant, chalk color")
                            .price(4499.00)
                            .stock(70)
                            .sku("GOO-NM-CHK")
                            .imageUrl("https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Canon EOS R50")
                            .description("24.2MP Mirrorless camera, 4K video, RF mount")
                            .price(69995.00)
                            .stock(8)
                            .sku("CAN-R50-KIT")
                            .imageUrl("https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("iPad Air 5th Gen")
                            .description("10.9 inch Liquid Retina, M1 chip, 64GB WiFi")
                            .price(59900.00)
                            .stock(18)
                            .sku("APP-IPA5-64")
                            .imageUrl("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Samsung Galaxy Tab S9")
                            .description("11 inch Dynamic AMOLED, S Pen included, 256GB")
                            .price(84999.00)
                            .stock(12)
                            .sku("SAM-TS9-256")
                            .imageUrl("https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop")
                            .build(),

                    Product.builder()
                            .title("Mi TV 5X 43 inch")
                            .description("4K Android TV, Dolby Vision, 20W speakers")
                            .price(32999.00)
                            .stock(22)
                            .sku("MI-TV43-5X")
                            .imageUrl("https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop")
                            .build()
            );

            productRepository.saveAll(products);
            System.out.println("📦 Products created: 20 common e-commerce products");
        }
    }

    private void createSampleOrders() {
        if (orderRepository.count() == 0) {
            User customer = userRepository.findByEmail("customer@shop.com")
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            List<Order> orders = Arrays.asList(
                    Order.builder()
                            .user(customer)
                            .totalAmount(129999.00)
                            .status(OrderStatus.PENDING)
                            .createdAt(java.time.Instant.now())
                            .build(),

                    Order.builder()
                            .user(customer)
                            .totalAmount(29990.00)
                            .status(OrderStatus.PROCESSING)
                            .createdAt(java.time.Instant.now().minusSeconds(86400)) // 1 day ago
                            .build(),

                    Order.builder()
                            .user(customer)
                            .totalAmount(54990.00)
                            .status(OrderStatus.SHIPPED)
                            .createdAt(java.time.Instant.now().minusSeconds(172800)) // 2 days ago
                            .build(),

                    Order.builder()
                            .user(customer)
                            .totalAmount(41900.00)
                            .status(OrderStatus.DELIVERED)
                            .createdAt(java.time.Instant.now().minusSeconds(259200)) // 3 days ago
                            .build(),

                    Order.builder()
                            .user(customer)
                            .totalAmount(129995.00)
                            .status(OrderStatus.CANCELLED)
                            .createdAt(java.time.Instant.now().minusSeconds(345600)) // 4 days ago
                            .build()
            );

            orderRepository.saveAll(orders);
            System.out.println("📋 Sample orders created with all status types");
        }
    }
}