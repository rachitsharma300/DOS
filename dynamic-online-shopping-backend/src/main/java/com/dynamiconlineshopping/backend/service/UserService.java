package com.dynamiconlineshopping.backend.service;

import com.dynamiconlineshopping.backend.dto.UserDto;

import java.util.List;
import java.util.Map;

/**
 * UserService - User management operations
 */
public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long userId);
    UserDto updateUserRole(Long userId, String role);
//    Object getDashboardStats();
    Map<String, Object> getDashboardStats();
}