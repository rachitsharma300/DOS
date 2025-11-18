import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI, orderAPI, cartAPI } from "../services/api";
import {
  User,
  Mail,
  Calendar,
  Shield,
  ShoppingBag,
  Package,
  CreditCard,
  Settings,
  Edit3,
  Key,
  Trash2,
  Save,
  Award,
  TrendingUp,
  Heart,
  Star,
  Clock,
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const [ordersRes, cartRes] = await Promise.all([
        orderAPI.getAll(),
        cartAPI.get(),
      ]);
      setOrders(ordersRes.data);
      setCartItems(cartRes.data);

      // Calculate stats
      const totalOrders = ordersRes.data.length;
      const pendingOrders = ordersRes.data.filter(
        (order) => order.status === "PENDING"
      ).length;
      const completedOrders = ordersRes.data.filter(
        (order) => order.status === "PAID" || order.status === "DELIVERED"
      ).length;

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        cartItems: cartRes.data.length,
        totalSpent: ordersRes.data.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        ),
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Update profile logic would go here
      setEditing(false);
      // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Access Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to view your profile and manage your account.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              🔐 Login to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Account
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Manage your profile, orders, and preferences
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">
                  {user.name || "User"}
                </h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                    user.role === "ADMIN"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role === "ADMIN" ? "👑 ADMIN" : "👤 CUSTOMER"}
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "overview", label: "📊 Overview", icon: TrendingUp },
                  { id: "orders", label: "📦 My Orders", icon: Package },
                  { id: "edit", label: "✏️ Edit Profile", icon: Edit3 },
                  { id: "security", label: "🔒 Security", icon: Key },
                  {
                    id: "preferences",
                    label: "⚙️ Preferences",
                    icon: Settings,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Total Orders
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          {loading ? "..." : stats?.totalOrders || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-green-600 mt-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>Active customer</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Pending
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          {loading ? "..." : stats?.pendingOrders || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Awaiting processing
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Total Spent
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          ₹
                          {loading
                            ? "..."
                            : (stats?.totalSpent || 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Lifetime value
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          Cart Items
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          {loading ? "..." : stats?.cartItems || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Ready to checkout
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              order.status === "DELIVERED"
                                ? "bg-green-500"
                                : order.status === "PAID"
                                ? "bg-blue-500"
                                : order.status === "PENDING"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items?.length || 0} items •{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            ₹{order.totalAmount?.toFixed(2)}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : order.status === "PAID"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p>No orders yet. Start shopping!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === "edit" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Edit Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {(activeTab === "orders" ||
              activeTab === "security" ||
              activeTab === "preferences") && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {activeTab === "orders" && "Order History"}
                  {activeTab === "security" && "Security Settings"}
                  {activeTab === "preferences" && "Preferences"}
                </h3>
                <p className="text-gray-600 mb-6">
                  This section is coming soon with more advanced features!
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl inline-block">
                  🚀 Coming Soon
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
