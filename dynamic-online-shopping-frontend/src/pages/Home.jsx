import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { productAPI } from "../services/api";
import {
  ShoppingBag,
  Truck,
  Shield,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      const products = response.data;

      // Get featured products (first 4)
      setFeaturedProducts(products.slice(0, 4));
      // Get trending products (next 8)
      setTrendingProducts(products.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Super quick delivery within 24 hours in metro cities",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Secure",
      description: "Bank-level security for all your transactions",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Curated selection of high-quality products",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
      color: "from-blue-500 to-cyan-600",
    },
  ];

  const categories = [
    { name: "Electronics", count: "120+", color: "bg-blue-500", icon: "📱" },
    { name: "Fashion", count: "250+", color: "bg-pink-500", icon: "👕" },
    {
      name: "Home & Kitchen",
      count: "180+",
      color: "bg-green-500",
      icon: "🏠",
    },
    { name: "Sports", count: "90+", color: "bg-orange-500", icon: "⚽" },
  ];

  return (
    <div className="min-h-screen">
      {/*  Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold">
                India's Fastest Growing E-commerce
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
                DynamicShop
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Discover, shop, and experience the future of online shopping.
              <span className="block text-yellow-200 font-semibold mt-2">
                Where every click brings you closer to perfection.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2"
                  >
                    <span>Start Shopping Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/products"
                    className="group border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all backdrop-blur-sm flex items-center space-x-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Explore Products</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/products"
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Handpicked selection of our most popular and trending items
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded w-full"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Experience the difference with our premium shopping features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl bg-white border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Shop By Category
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Explore our wide range of product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-200"
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {category.count} Products
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Customers", icon: "😊" },
              { number: "500+", label: "Premium Products", icon: "📦" },
              { number: "25K+", label: "Orders Delivered", icon: "🚚" },
              { number: "50+", label: "Cities Served", icon: "🏙️" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-semibold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-2xl opacity-70">{stat.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-24 translate-y-24"></div>

        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to Experience
            <span className="block text-yellow-300">Dynamic Shopping?</span>
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join the revolution of modern e-commerce. Fast, secure, and
            absolutely delightful shopping experience awaits you.
          </p>
          <Link
            to={isAuthenticated ? "/products" : "/register"}
            className="inline-flex items-center space-x-3 bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isAuthenticated ? "Explore More" : "Get Started Now"}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
