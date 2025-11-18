package com.dynamiconlineshopping.backend.service.impl;

import com.dynamiconlineshopping.backend.dto.UserDto;
import com.dynamiconlineshopping.backend.entity.User;
import com.dynamiconlineshopping.backend.enums.Role;
import com.dynamiconlineshopping.backend.exception.ResourceNotFoundException;
import com.dynamiconlineshopping.backend.repository.OrderRepository;
import com.dynamiconlineshopping.backend.repository.ProductRepository;
import com.dynamiconlineshopping.backend.repository.UserRepository;
import com.dynamiconlineshopping.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    private UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return toDto(user);
    }

    @Override
    public UserDto updateUserRole(Long userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setRole(Role.valueOf(role.toUpperCase()));
        User updatedUser = userRepository.save(user);

        return toDto(updatedUser);
    }

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        try {
            // Total users count
            stats.put("totalUsers", userRepository.count());

            // Total products count
            stats.put("totalProducts", productRepository.count());

            // Total orders count
            stats.put("totalOrders", orderRepository.count());

            // Users by role
            Map<String, Long> usersByRole = new HashMap<>();
            usersByRole.put("ADMIN", userRepository.countByRole(Role.ADMIN));
            usersByRole.put("CUSTOMER", userRepository.countByRole(Role.CUSTOMER));
            stats.put("usersByRole", usersByRole);

            // Calculate total revenue from PAID orders
            Double totalRevenue = orderRepository.findAll().stream()
                    .filter(order -> order.getStatus() != null && order.getStatus().name().equals("PAID"))
                    .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                    .sum();
            stats.put("totalRevenue", totalRevenue);

            // Recent orders (last 5)
            List<Map<String, Object>> recentOrders = orderRepository.findTop5ByOrderByCreatedAtDesc()
                    .stream()
                    .map(order -> {
                        Map<String, Object> orderMap = new HashMap<>();
                        orderMap.put("id", order.getId());
                        orderMap.put("status", order.getStatus() != null ? order.getStatus().name() : "PENDING");
                        orderMap.put("totalAmount", order.getTotalAmount());
                        orderMap.put("createdAt", order.getCreatedAt());
                        return orderMap;
                    })
                    .collect(Collectors.toList());
            stats.put("recentOrders", recentOrders);

        } catch (Exception e) {
            // Default values if any error occurs
            stats.put("totalUsers", 0L);
            stats.put("totalProducts", 0L);
            stats.put("totalOrders", 0L);
            stats.put("totalRevenue", 0.0);
            stats.put("recentOrders", List.of());
        }

        return stats;
    }
}