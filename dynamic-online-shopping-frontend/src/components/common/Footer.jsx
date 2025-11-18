import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DynamicShop
              </h2>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Your dynamic destination for amazing products. Experience seamless
              shopping with the latest trends and exclusive deals!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-pink-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-red-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white border-l-4 border-blue-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Your Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white border-l-4 border-green-500 pl-3">
              Help & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group text-sm"
                >
                  <div className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white border-l-4 border-purple-500 pl-3">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white">
                  support@dynamicshop.com
                </span>
              </div>
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500 transition-colors">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white">
                  +91 9871874041
                </span>
              </div>
              <div className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500 transition-colors">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm group-hover:text-white">
                  Bihar, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg mb-2">Stay Updated!</h3>
              <p className="text-gray-300 text-sm">
                Get the latest deals and product updates
              </p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 text-sm"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center justify-center">
              © {currentYear} DynamicShop. Made with{" "}
              <Heart className="w-4 h-4 text-red-500 mx-1" /> for amazing
              shopping experiences.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
