import React, { useState, useEffect } from "react";
import { productAPI } from "../services/api";
import ProductCard from "../components/products/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  Search,
  Filter,
  Grid,
  List,
  X,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const Products = () => {
  // State management - products, loading, errors, etc.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("name"); // 'name', 'price-low', 'price-high'
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  // Products fetch karta hai component load hote hi
  useEffect(() => {
    fetchProducts();
  }, []);

  // API se products fetch karta hai
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Products fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get max price for range slider
  const maxPrice = Math.max(...products.map((p) => p.price), 10000);

  // Search and filter products
  const filteredAndSortedProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setSortBy("name");
  };

  // Loading state dikhata hai
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            </div>
            <LoadingSpinner text="Discovering amazing products..." />
          </div>
        </div>
      </div>
    );
  }

  // Error state dikhata hai
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Unable to Load Products
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collection of premium products. Find
            exactly what you're looking for with our powerful search and
            filters!
          </p>
        </div>

        {/* Search and Controls Bar */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 sticky top-4 z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Box */}
            <div className="flex-1 w-full lg:max-w-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg shadow-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  showFilters
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 lg:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-transparent appearance-none bg-white font-medium transition-all duration-200 shadow-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                {/* Price Range */}
                <div className="flex-1 w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹0</span>
                      <span>₹{maxPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count and Stats */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-700 font-medium">
              Found{" "}
              <span className="text-blue-600 font-bold">
                {filteredAndSortedProducts.length}
              </span>{" "}
              of <span className="text-gray-800">{products.length}</span>{" "}
              products
              {searchTerm && (
                <span className="text-gray-600">
                  {" "}
                  for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {products.filter((p) => p.price < 1000).length} under ₹1k
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              {products.filter((p) => p.price >= 1000 && p.price < 5000).length}{" "}
              ₹1k-5k
            </span>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length === 0 ? (
          // No products found state
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Products Found
              </h3>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {searchTerm
                  ? `We couldn't find any products matching "${searchTerm}". Try adjusting your search terms or filters.`
                  : "No products are currently available. Please check back later!"}
              </p>
              {(searchTerm ||
                priceRange[0] > 0 ||
                priceRange[1] < maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          // Products display
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }
          >
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More Section */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Found what you're looking for?
              </h3>
              <p className="text-gray-600 mb-4">
                Explore more amazing products in our collection
              </p>
              <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm">
                Load More Products
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for range slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Products;
