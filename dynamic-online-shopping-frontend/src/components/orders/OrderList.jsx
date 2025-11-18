import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { orderAPI } from "../../services/api";
import OrderCard from "./OrderCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Package, Filter, Search, ArrowUpDown, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter and sort states
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch orders on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = orders
    .filter((order) => {
      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        (order.razorpayOrderId && order.razorpayOrderId.includes(searchTerm));
      return matchesStatus && matchesSearch;
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

  const handleOrderClick = (order) => {
    // Navigate to order details page or show modal
    navigate(`/orders/${order.id}`);
  };

  // If not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Please Login
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your orders.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <LoadingSpinner text="Loading your orders..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Orders
              </h1>
              <p className="text-gray-600">
                Track and manage all your purchases in one place
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
              <button
                onClick={fetchOrders}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID or Payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredAndSortedOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm || statusFilter !== "ALL"
                ? "No orders found"
                : "No orders yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "ALL"
                ? "Try adjusting your search or filters"
                : "Start shopping to see your orders here!"}
            </p>
            {!searchTerm && statusFilter === "ALL" && (
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Orders Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                Showing {filteredAndSortedOrders.length} order
                {filteredAndSortedOrders.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Orders List */}
            {filteredAndSortedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => handleOrderClick(order)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add RefreshCw icon import at the top
import {
  Package,
  Filter,
  Search,
  ArrowUpDown,
  Calendar,
  RefreshCw,
} from "lucide-react";

export default OrderList;
