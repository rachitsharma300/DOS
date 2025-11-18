import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  UserPlus,
  ShoppingBag,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 py-8 px-4">
      {/*  Registration Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/*  Card Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 py-8 px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Join DynamicShop!
          </h2>
          <p className="text-blue-100 text-sm">
            Create your account and start shopping
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8">
          {/*  Success Message */}
          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-lg mb-6 shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                <p className="text-sm font-medium">{success}</p>
              </div>
            </div>
          )}

          {/*  Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/*  Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*  Full Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 placeholder-gray-400"
                  placeholder="Rachit Sharma"
                />
              </div>
            </div>

            {/*  Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/*  Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 placeholder-gray-400"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                🔒 Password must be at least 6 characters long
              </p>
            </div>

            {/*  Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm transition-all duration-200 placeholder-gray-400"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/*  Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white py-4 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/*  Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/*  Features List */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 shadow-sm">
            <h4 className="text-sm font-semibold text-emerald-800 mb-3 text-center">
              🎁 Why Join DynamicShop?
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Fast & secure checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Track your orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Exclusive deals & offers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
