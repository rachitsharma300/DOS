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

🏪 Product Catalog

· Browse products with categories
· Product search and filtering
· Product details with images
· Stock management

🛒 Shopping Cart

· Add/remove items from cart
· Quantity management
· Cart persistence across sessions
· Price calculations

📦 Order Management

· Order placement
· Order status tracking
· Order history
· Invoice generation

💳 Payment Integration

· Razorpay payment gateway
· Secure payment processing
· Payment status tracking
· Order confirmation

🔐 Security & Authentication

· JWT-based secure authentication
· Password hashing using BCrypt
· Role-based access control
· CORS enabled for frontend integration


🛠 Tech Stack

🧩 Backend

Component Technology
Framework Spring Boot 3.5.7
Security Spring Security 6.5.5 + JWT
Database PostgreSQL + Spring Data JPA
API Docs Swagger / OpenAPI 3.1
Testing JUnit 5, Mockito
Build Tool Maven
Java Version JDK 21

⚡ Frontend

Component Technology
Framework React 18
Routing React Router DOM
HTTP Client Axios
State Management React Context API
UI Components Custom CSS/Tailwind

☁️ Cloud Services

Service Provider
Backend Deployment Render
Frontend Deployment Netlify
Database PostgreSQL (Render)

📋 API Endpoints

🔑 Authentication Endpoints

Method Endpoint Description Access
POST /api/auth/register User Registration Public
POST /api/auth/login Login & Token Issuance Public


🏪 Product Endpoints

Method Endpoint Description Access
GET /api/products Get all products Public
GET /api/products/{id} Get product by ID Public
POST /api/products Create new product Admin
PUT /api/products/{id} Update product Admin
DELETE /api/products/{id} Delete product Admin

---
🛒 Cart Endpoints

Method Endpoint Description Access
GET /api/cart Get user cart User
POST /api/cart Add item to cart User
PUT /api/cart/{id} Update cart item User
DELETE /api/cart/{id} Remove from cart User

📦 Order Endpoints

Method Endpoint Description Access
POST /api/orders/place Place new order User
GET /api/orders Get user orders User
GET /api/orders/{id} Get order by ID User
---

💳 Payment Endpoints

Method Endpoint Description Access
POST /api/payments/create-order/{orderId} Create payment order User
POST /api/payments/verify Verify payment User


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
