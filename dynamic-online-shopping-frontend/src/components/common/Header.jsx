import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  Shield,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle logout - clear everything and go home
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section - Left Side -  */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DynamicShop
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Online Shopping Redefined
              </p>
            </div>
          </Link>

          {/* Navigation Links - Center -  */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-2xl p-1">
            <Link
              to="/"
              className="px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:text-blue-600 text-gray-700"
            >
              🏠 Home
            </Link>
            <Link
              to="/products"
              className="px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:text-blue-600 text-gray-700"
            >
              🛍️ Products
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:text-blue-600 text-gray-700"
                >
                  🛒 Cart
                </Link>
                <Link
                  to="/orders"
                  className="px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:text-blue-600 text-gray-700"
                >
                  📦 Orders
                </Link>
                <Link
                  to="/profile"
                  className="px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:text-blue-600 text-gray-700"
                >
                  👤 Profile
                </Link>

                {/* Admin Dashboard Link - Only show for ADMIN users -  */}
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-2 px-5 py-2 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transform hover:scale-105"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Actions - Right Side -  */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon with badge -  */}
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative p-3 bg-gray-100 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 group"
              >
                <ShoppingCart className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  1
                </div>
              </Link>
            )}

            {/* User Menu -  */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Info with Role Badge -  */}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {user?.role === "ADMIN" ? "Administrator" : "Customer"}
                      </span>
                      {user?.role === "ADMIN" && (
                        <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                          PRO
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logout Button -  */}
                <button
                  onClick={handleLogout}
                  className="p-3 bg-gray-100 rounded-xl text-gray-500 hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // Login/Register buttons for guests - 
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-3 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  🔐 Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button -  */}
            <button className="md:hidden p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
