## Dynamic Online Shopping - Ecommerce Platform

### A full-featured Ecommerce System built with Spring Boot & React that supports:

· User authentication and authorization
· Product catalog and management
· Shopping cart functionality
· Order processing system
· Razorpay payment integration
· Admin dashboard for management
---

🚀 Features

👥 User Management

· User registration and login
· Profile management
· Order history tracking
· Secure authentication


## Project Structure
```
com.dynamiconlineshopping.backend
├── config
│ ├── CorsConfig
│ ├── CustomUserDetailsService
│ ├── DataSeeder
│ ├── JwtAuthFilter
│ ├── JwtUtil
│ └── SecurityConfig
├── controller
│ ├── AdminController
│ ├── AuthController
│ ├── CartController
│ ├── OrderController
│ ├── PaymentController
│ └── ProductController
├── dto
│ ├── AuthRequest
│ ├── CartItemDto
│ ├── OrderResponseDto
│ ├── ProductDto
│ ├── RegisterRequest
│ └── UserDto
├── entity
│ ├── CartItem
│ ├── Order
│ ├── Payment
│ ├── Product
│ └── User
├── enums
│ ├── OrderStatus
│ └── Role
├── exception
│ ├── GlobalExceptionHandler
│ └── ResourceNotFoundException
├── repository
│ ├── CartRepository
│ ├── OrderRepository
│ ├── PaymentRepository
│ ├── ProductRepository
│ └── UserRepository
├── service
│ ├── AuthService
│ ├── CartService
│ ├── OrderService
│ ├── PaymentService
│ ├── ProductService
│ └── UserService
│ └── impl
│ ├── AuthServiceImpl
│ ├── CartServiceImpl
│ ├── OrderServiceImpl
│ ├── PaymentServiceImpl
│ ├── ProductServiceImpl
│ └── UserServiceImpl
└── DynamicOnlineShoppingBackendApplication
resources
├── static
├── templates
└── application.properties
```

## 📁 Project Structure

```
dynamic-online-shopping-frontend/
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── cart/
│ │ │ └── CartItem.jsx
│ │ ├── common/
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ └── LoadingSpinner.jsx
│ │ ├── orders/
│ │ │ ├── OrderCard.jsx
│ │ │ └── OrderList.jsx
│ │ └── products/
│ │ ├── ProductCard.jsx
│ │ ├── ProductDetails.jsx
│ │ └── ProductList.jsx
│ ├── context/
│ │ └── AuthContext.jsx
│ ├── pages/
│ │ ├── AdminDashboard.jsx
│ │ ├── Cart.jsx
│ │ ├── Home.jsx
│ │ ├── Orders.jsx
│ │ ├── Products.jsx
│ │ └── Profile.jsx
│ ├── services/
│ ├── apis/
│ ├── utils/
│ │ ├── constants.js
│ │ └── razoppy.js
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
└── package.json

```
