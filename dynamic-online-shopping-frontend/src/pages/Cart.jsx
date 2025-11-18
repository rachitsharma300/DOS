import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cartAPI, orderAPI, paymentAPI } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Loader,
} from "lucide-react";

// Razorpay script loader
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState("");

  // Cart items fetch karta hai
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCartItems(response.data);
    } catch (err) {
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  // Quantity update karta hai
  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating(cartItemId);
    try {
      await cartAPI.update(cartItemId, { quantity: newQuantity });
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError("Failed to update quantity");
    } finally {
      setUpdating(null);
    }
  };

  // Item remove karta hai
  const removeItem = async (cartItemId) => {
    setUpdating(cartItemId);
    try {
      await cartAPI.remove(cartItemId);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setUpdating(null);
    }
  };

  // ✅ NEW: Razorpay Payment Integration
  const initiateRazorpayPayment = async () => {
    setProcessingPayment(true);
    setError("");

    try {
      // Step 1: Place order first
      const orderResponse = await orderAPI.place();
      const order = orderResponse.data;
      console.log("Order placed:", order);

      // Step 2: Load Razorpay SDK
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Step 3: Create Razorpay order
      const paymentResponse = await paymentAPI.createOrder(order.id);
      const razorpayOrder = paymentResponse.data;
      console.log("Razorpay order:", razorpayOrder);

      // Step 4: Razorpay options
      const options = {
        key: razorpayOrder.key || "rzp_test_RexSddehHHkC49", // Use key from backend or fallback
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Dynamic Online Shopping",
        description: `Order #${order.id}`,
        order_id: razorpayOrder.razorpay_order_id,
        handler: async function (response) {
          try {
            console.log("Payment successful:", response);

            // Step 5: Verify payment
            const verifyResponse = await paymentAPI.verify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order.id,
            });
            console.log("Payment verification:", verifyResponse.data);

            // Step 6: Success - redirect to orders
            alert("Payment successful! Your order has been placed.");
            navigate("/orders");
          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.fullName || "Customer",
          email: user?.email || "",
          contact: "", // Add phone if available
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: function () {
            setProcessingPayment(false);
            setError("Payment cancelled by user");
          },
        },
      };

      // Step 7: Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
    } finally {
      setProcessingPayment(false);
    }
  };

  // Total calculate karta hai
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 40 : 0; // Fixed shipping
  const total = subtotal + shipping;

  // Login check karta hai
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Please Login
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your cart.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="Loading your cart..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          // Empty cart state
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing products!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.product?.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.product?.title || "Product"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.product?.description || "Product description"}
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        ₹
                        {item.product?.price
                          ? (item.product.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      {/* Decrease Button */}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={updating === item.id || item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      {/* Quantity Display */}
                      <span className="w-12 text-center font-medium">
                        {updating === item.id ? (
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        ) : (
                          item.quantity
                        )}
                      </span>

                      {/* Increase Button */}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={updating === item.id}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating === item.id}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* ✅ UPDATED: Checkout Button with Razorpay */}
                <button
                  onClick={initiateRazorpayPayment}
                  disabled={processingPayment}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                  {processingPayment ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment powered by Razorpay
                </p>

                {/* Continue Shopping Link */}
                <Link
                  to="/products"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
