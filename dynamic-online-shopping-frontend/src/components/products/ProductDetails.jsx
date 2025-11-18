import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { productAPI, cartAPI } from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Heart,
  Share2,
  CheckCircle,
  Zap,
  Clock,
  Award,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  React.useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    setAddingToCart(true);
    try {
      await cartAPI.add({
        productId: product.id,
        quantity: quantity,
      });
      alert("Product added to cart successfully!");
    } catch (error) {
      alert("Failed to add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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

  // Mock images for demo
  const productImages = [
    product?.imageUrl,
    product?.imageUrl,
    product?.imageUrl,
    product?.imageUrl,
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="Loading product details..." />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-500 text-3xl">❌</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviews = Math.floor(Math.random() * 100) + 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/*  Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 mb-8 transition-all duration-300 group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-50 group-hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Back to Products</span>
        </button>

        {/*  Product Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/*  Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 overflow-hidden shadow-inner">
                {productImages[activeImage] ? (
                  <img
                    src={productImages[activeImage]}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">📦</span>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`bg-gray-100 rounded-xl h-20 cursor-pointer transition-all duration-300 border-2 ${
                      activeImage === index
                        ? "border-blue-500 shadow-md scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <span className="text-lg">📸</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/*  Product Info */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                    {product.title}
                  </h1>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleWishlist}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        isWishlisted
                          ? "bg-red-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rating and Stock */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-xl">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-bold text-gray-800">{rating}</span>
                    <span className="text-gray-600">({reviews} reviews)</span>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                      product.stock > 10
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : product.stock > 0
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {product.stock > 10
                      ? "In Stock"
                      : product.stock > 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>

                {/* SKU */}
                <p className="text-gray-500 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg inline-block">
                  SKU: {product.sku || "N/A"}
                </p>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </div>
                <div className="flex items-center space-x-2 text-green-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Inclusive of all taxes</span>
                </div>
              </div>

              {/*  Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">
                  Product Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {/*  Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-4 p-3 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Free Shipping</p>
                    <p className="text-sm text-gray-600">
                      Delivery in 2-3 days
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      1 Year Warranty
                    </p>
                    <p className="text-sm text-gray-600">
                      Full device coverage
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Fast Support</p>
                    <p className="text-sm text-gray-600">24/7 customer care</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Quality Assured
                    </p>
                    <p className="text-sm text-gray-600">
                      Premium quality product
                    </p>
                  </div>
                </div>
              </div>

              {/*  Quantity and Add to Cart */}
              <div className="space-y-6 border-t border-gray-200 pt-8">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <span className="font-bold text-gray-700 text-lg">
                      Quantity:
                    </span>
                    <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-2 border border-gray-200">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-12 h-12 flex items-center justify-center bg-white rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-all duration-300 shadow-sm"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-16 text-center font-bold text-xl text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock}
                        className="w-12 h-12 flex items-center justify-center bg-white rounded-lg hover:bg-green-50 hover:text-green-600 disabled:opacity-50 transition-all duration-300 shadow-sm"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {product.stock} units available
                  </span>
                </div>

                {/*  Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.stock === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-5 px-8 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {addingToCart ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding to Cart...</span>
                    </>
                  ) : product.stock === 0 ? (
                    <span>Out of Stock</span>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      <span>
                        Add to Cart - {formatPrice(product.price * quantity)}
                      </span>
                    </>
                  )}
                </button>

                {/* Additional Info */}
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Delivery in 2-3 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
