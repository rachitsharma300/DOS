import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { orderAPI } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  Package,
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Eye,
  Truck,
  ShoppingBag,
  Search,
  Filter,
} from "lucide-react";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  // Orders fetch karta hai
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm.toLowerCase()) ||
        order.items?.some((item) =>
          item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "amount-high":
          return b.totalAmount - a.totalAmount;
        case "amount-low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

  // Status badge styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700 border border-green-200";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border border-red-200";
      case "SHIPPED":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "DELIVERED":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "PAID":
        return <CheckCircle className="w-4 h-4" />;
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      case "SHIPPED":
        return <Truck className="w-4 h-4" />;
      case "DELIVERED":
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Login check
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center transform hover:scale-[1.02] transition-transform duration-200">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Access Your Orders
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Sign in to view your complete order history and tracking
              information
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="Loading your orders..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Order History
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your purchases, view order details, and manage your shopping
            history
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {orders.length === 0 ? (
          // No orders state
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Orders Found
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your order history is empty. Start exploring our products and make
              your first purchase!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search orders or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING">Pending</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                </select>
              </div>

              {/* Results count */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  Showing {filteredAndSortedOrders.length} of {orders.length}{" "}
                  orders
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>

            {/* Orders list */}
            <div className="space-y-6">
              {filteredAndSortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:scale-[1.01] transition-all duration-200"
                >
                  {/* Order Header */}
                  <div className="border-b border-gray-100 px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-800 text-lg">
                              Order #{order.id}
                            </span>
                            <div className="flex items-center space-x-2 mt-1">
                              {/* Status Badge */}
                              <span
                                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusStyles(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                <span>{order.status.replace("_", " ")}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.createdAt)}</span>
                          <span className="text-gray-400">•</span>
                          <span>{formatTime(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-800 bg-blue-50 px-4 py-2 rounded-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span className="font-bold text-lg">
                            {order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-8">
                    <div className="space-y-4">
                      {order.items &&
                        order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-6 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-150"
                          >
                            <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 overflow-hidden shadow-sm border border-gray-200">
                              {item.product?.imageUrl ? (
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                                  <Package className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 truncate">
                                {item.product?.title ||
                                  "Product Name Not Available"}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                Quantity: {item.quantity} • ₹
                                {item.product?.price?.toFixed(2) || "0.00"} each
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="font-bold text-gray-800 text-lg">
                                ₹
                                {item.product?.price
                                  ? (
                                      item.product.price * item.quantity
                                    ).toFixed(2)
                                  : "0.00"}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Order Actions */}
                    <div className="border-t border-gray-100 mt-6 pt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {order.items?.length || 0} item
                        {order.items?.length !== 1 ? "s" : ""} in this order
                      </div>
                      <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty filtered state */}
            {filteredAndSortedOrders.length === 0 && orders.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No Orders Match Your Search
                </h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
