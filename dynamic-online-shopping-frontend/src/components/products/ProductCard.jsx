import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { cartAPI } from "../../services/api";
import {
  ShoppingCart,
  Star,
  Eye,
  CheckCircle,
  Heart,
  Zap,
  Shield,
} from "lucide-react";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    setAddingToCart(true);
    try {
      await cartAPI.add({
        productId: product.id,
        quantity: 1,
      });

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Generate random ratings and reviews
  const randomRating = (Math.random() * 2 + 3).toFixed(1);
  const randomReviews = Math.floor(Math.random() * 100) + 10;

  // Grid view -  design
  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2">
        {/* Product Image Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-56 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
          )}

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {/* Stock Status */}
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                product.stock > 10
                  ? "bg-emerald-500 text-white"
                  : product.stock > 0
                  ? "bg-amber-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                ? "Low Stock"
                : "Sold Out"}
            </span>

            {/* Express Delivery Badge */}
            {product.stock > 0 && (
              <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium flex items-center space-x-1 shadow-lg">
                <Zap className="w-3 h-3" />
                <span>Fast Delivery</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
            <button className="bg-white text-gray-800 p-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600">
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-blue-500 text-white p-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-5">
          {/* Product Title and Category */}
          <div className="mb-3">
            <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Rating and Trust Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-bold text-gray-800">
                  {randomRating}
                </span>
              </div>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-500 text-sm">
                {randomReviews} reviews
              </span>
            </div>

            <div className="flex items-center space-x-1 text-emerald-600">
              <Shield className="w-3 h-3" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/*  Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || addedToCart || product.stock === 0}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                addedToCart
                  ? "bg-emerald-500 text-white shadow-emerald-200"
                  : product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Adding...</span>
                </>
              ) : addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Added!</span>
                </>
              ) : product.stock === 0 ? (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Sold Out</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Additional Features */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //  List view
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 group">
      <div className="flex">
        {/* Product Image -  */}
        <div className="w-40 h-40 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 relative group">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-all ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50"
            }`}
          >
            <Heart
              className={`w-3 h-3 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Product Details -  */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Top Section */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ml-4 ${
                  product.stock > 10
                    ? "bg-emerald-100 text-emerald-800"
                    : product.stock > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                  ? "Low Stock"
                  : "Sold Out"}
              </span>
            </div>

            {/* Rating and Features */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-bold text-gray-800">
                  {randomRating}
                </span>
                <span className="text-gray-500 text-sm">({randomReviews})</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>Fast Delivery</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || addedToCart || product.stock === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                addedToCart
                  ? "bg-emerald-500 text-white"
                  : product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl"
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : addedToCart ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : product.stock === 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
