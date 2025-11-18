import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductDetails from "./components/products/ProductDetails";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Main layout wrapper - beautiful gradient background */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
          {/* Sticky header - stays on top like a boss */}
          <Header />

          {/* Main content area - grows to fill remaining space */}
          <main className="flex-grow">
            <Routes>
              {/* ==================== */}
              {/* PUBLIC ROUTES - Anyone can access these */}
              {/* ==================== */}

              {/* Home Page - Welcome page for everyone */}
              <Route path="/" element={<Home />} />

              {/* Products Listing - Browse all products */}
              <Route path="/products" element={<Products />} />

              {/* Product Details - View individual product */}
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Authentication - Login and registration */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ==================== */}
              {/* PROTECTED ROUTES - Need login to access */}
              {/* ==================== */}

              {/* Shopping Cart - User's cart items */}
              <Route path="/cart" element={<Cart />} />

              {/* Order History - User's past orders */}
              <Route path="/orders" element={<Orders />} />

              {/* User Profile - Account management */}
              <Route path="/profile" element={<Profile />} />

              {/* ==================== */}
              {/* ADMIN ROUTES - Only for ADMIN users */}
              {/* ==================== */}

              {/* Admin Dashboard - Overview and statistics */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* ==================== */}
              {/* ERROR HANDLING ROUTES */}
              {/* ==================== */}

              {/* 404 Page - When no route matches */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
                    <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-gray-200">
                      {/* Big 404 number */}
                      <h1 className="text-9xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                        404
                      </h1>

                      {/* Error message */}
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Oops! Page Not Found
                      </h2>

                      <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been
                        moved. Let's get you back to shopping!
                      </p>

                      {/* Action buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          to="/"
                          className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
                        >
                          🏠 Go Home
                        </Link>
                        <Link
                          to="/products"
                          className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-colors"
                        >
                          🛍️ Continue Shopping
                        </Link>
                      </div>

                      {/* Fun illustration */}
                      <div className="mt-8 text-6xl">🛒❌</div>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer - always at the bottom, provides additional links and info */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Export the app to make it available for the whole world to see!
export default App;
