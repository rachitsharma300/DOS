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
