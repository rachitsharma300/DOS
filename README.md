# 🛒 Dynamic Online Shopping – Ecommerce Platform

A full-featured Ecommerce System built with Spring Boot & React that supports:

- User authentication and authorization
- Product catalog and management
- Shopping cart functionality
- Order processing system
- Razorpay payment integration
- Admin dashboard for management
---

## 🚀 Features
👥 User Management
- User registration and login
- Profile management
- Order history tracking
- Secure authentication

## 🏪 Product Catalog

- Browse products with categories
- Product search and filtering
- Product details with images
- Stock management

## 🛒 Shopping Cart

- Add/remove items from cart
- Quantity management
- Cart persistence across sessions
- Price calculations

## 📦 Order Management

- Order placement
- Order status tracking
- Order history
- Invoice generation

## 💳 Payment Integration

- Razorpay payment gateway
- Secure payment processing
- Payment status tracking
- Order confirmation

## 🔐 Security & Authentication

- JWT-based secure authentication
- Password hashing using BCrypt
- Role-based access control
- CORS enabled for frontend integration

## Tech Stack
🧩 Backend
| Component    | Technology                       |
| ------------ | -------------------------------- |
| Framework    | **Spring Boot 3.5.7**            |
| Security     | **Spring Security 6.5.5 + JWT**  |
| Database     | **PostgreSQL + Spring Data JPA** |
| API Docs     | **Swagger / OpenAPI 3.1**        |
| Testing      | **JUnit 5, Mockito**             |
| Build Tool   | **Maven**                        |
| Java Version | **JDK 21**                       |


## ⚡ Frontend
| Component        | Technology                |
| ---------------- | ------------------------- |
| Framework        | **React 18**              |
| Routing          | **React Router DOM**      |
| HTTP Client      | **Axios**                 |
| State Management | **React Context API**     |
| UI Components    | **Custom CSS / Tailwind** |


## ☁️ Cloud Services
| Service             | Provider                |
| ------------------- | ----------------------- |
| Backend Deployment  | **Render**              |
| Frontend Deployment | **Netlify**             |
| Database            | **PostgreSQL (Render)** |


## 📋 API Endpoints
🔑 Authentication Endpoints
| Method | Endpoint             | Description         | Access     |
| ------ | -------------------- | ------------------- | ---------- |
| POST   | `/api/auth/register` | User Registration   | **Public** |
| POST   | `/api/auth/login`    | Login & Token Issue | **Public** |


## 🏪 Product Endpoints
| Method | Endpoint             | Description       | Access     |
| ------ | -------------------- | ----------------- | ---------- |
| GET    | `/api/products`      | Get all products  | **Public** |
| GET    | `/api/products/{id}` | Get product by ID | **Public** |
| POST   | `/api/products`      | Create product    | **Admin**  |
| PUT    | `/api/products/{id}` | Update product    | **Admin**  |
| DELETE | `/api/products/{id}` | Delete product    | **Admin**  |


---
## 🛒 Cart Endpoints
| Method | Endpoint         | Description      | Access   |
| ------ | ---------------- | ---------------- | -------- |
| GET    | `/api/cart`      | Get user cart    | **User** |
| POST   | `/api/cart`      | Add to cart      | **User** |
| PUT    | `/api/cart/{id}` | Update cart item | **User** |
| DELETE | `/api/cart/{id}` | Remove item      | **User** |


## 📦 Order Endpoints
| Method | Endpoint            | Description     | Access   |
| ------ | ------------------- | --------------- | -------- |
| POST   | `/api/orders/place` | Place order     | **User** |
| GET    | `/api/orders`       | Get user orders | **User** |
| GET    | `/api/orders/{id}`  | Get order by ID | **User** |

---

## 💳 Payment Endpoints
| Method | Endpoint                               | Description    | Access   |
| ------ | -------------------------------------- | -------------- | -------- |
| POST   | `/api/payments/create-order/{orderId}` | Create payment | **User** |
| POST   | `/api/payments/verify`                 | Verify payment | **User** |

---

## 👨‍💼 Admin Endpoints
| Method | Endpoint                             | Description         | Access    |
| ------ | ------------------------------------ | ------------------- | --------- |
| GET    | `/api/admin/dashboard/stats`         | Dashboard stats     | **Admin** |
| GET    | `/api/admin/products`                | All products        | **Admin** |
| GET    | `/api/admin/orders`                  | All orders          | **Admin** |
| GET    | `/api/admin/users`                   | All users           | **Admin** |
| POST   | `/api/admin/products`                | Create product      | **Admin** |
| PUT    | `/api/admin/products/{id}`           | Update product      | **Admin** |
| DELETE | `/api/admin/products/{id}`           | Delete product      | **Admin** |
| PUT    | `/api/admin/orders/{orderId}/status` | Update order status | **Admin** |
| PUT    | `/api/admin/users/{userId}/role`     | Update user role    | **Admin** |

---

## 🗄 Database Schema
📊 Key Entities Overview
| Entity          | Important Fields                                     |
| --------------- | ---------------------------------------------------- |
| **Users**       | id, username, email, password, role                  |
| **Products**    | id, name, description, price, category, image, stock |
| **Cart**        | id, user_id, product_id, quantity                    |
| **Orders**      | id, user_id, total_amount, status, created_at        |
| **Order Items** | id, order_id, product_id, quantity, price            |
| **Payments**    | id, order_id, amount, status, razorpay_order_id      |

---

##⚙️ Installation & Setup
Prerequisites

- Java 21+
- PostgreSQL 15+
- Maven 3.6+
- Node.js 18+

---

## Local Development Setup

1️⃣ Clone Repository
```bash
git clone https://github.com/rachitsharma300/DOS.git
cd DOS/dynamic-online-shopping-backend
## Project Structure
```

2️⃣ Database Setup
```sql
CREATE DATABASE dynamiconline;
```
3️⃣ Update application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/dynamiconline
spring.datasource.username=your_username
spring.datasource.password=your_password
```

4️⃣ Run the Backend Application

```bash
./mvnw spring-boot:run
```
5️⃣ Run the Frontend Application

```bash
cd ../frontend
npm install
npm start
```

## 🚀 Deployment
Backend (Render)

- Connect GitHub repository
- Set root directory: dynamic-online-shopping-backend
- Build Command:
  ```
   ./mvnw clean package -DskipTests
  ```
- Start Command:
 ```
-  java -jar target/dynamic-online-shopping-backend-0.0.1-SNAPSHOT.jar
```

---


Frontend (Netlify)

· Connect GitHub repository
· Build Command: npm run build
· Publish Directory: build
· Environment Variable: REACT_APP_API_URL=https://your-backend.onrender.com/api



🔐 Environment Variables

Backend (Render)

```
JDBC_DATABASE_URL=postgresql://your_database_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=8080
CORS_ALLOWED_ORIGINS=https://your-frontend.netlify.app
```

Frontend (Netlify)

```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

🧪 Testing

Run Backend Tests

```bash
./mvnw test
```


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
👨‍💻 Author

Rachit Sharma
rachitsharma300
