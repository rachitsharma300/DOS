import React from "react";
import ProductCard from "./ProductCard";
import { Package, Search, Filter } from "lucide-react";

const ProductList = ({ products, viewMode = "grid", loading = false }) => {
  //  Loading state
  if (loading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-6"
        }
      >
        {/*  Loading skeletons */}
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${
              viewMode === "grid" ? "h-96" : "h-40"
            } animate-pulse`}
          >
            {/* Image skeleton */}
            <div
              className={`bg-gradient-to-br from-gray-200 to-gray-300 ${
                viewMode === "grid" ? "h-48" : "h-full w-40"
              } ${viewMode === "list" && "float-left mr-6"}`}
            ></div>

            {/* Content skeleton */}
            <div className={`p-6 space-y-4 ${viewMode === "list" && "pt-6"}`}>
              <div className="space-y-3">
                <div className="bg-gray-200 h-5 rounded-lg w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded-lg w-full"></div>
                <div className="bg-gray-200 h-4 rounded-lg w-2/3"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="bg-gray-200 h-6 rounded-lg w-24"></div>
                  <div className="bg-gray-200 h-4 rounded-lg w-32"></div>
                </div>
                <div className="bg-gray-200 h-12 rounded-xl w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  //  Empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-16 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Products Found
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            We couldn't find any products matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              Clear Filters
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-sm">
              Browse All Products
            </button>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Quick Tips
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Search className="w-4 h-4 text-blue-500" />
                <span>Check your search terms</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Filter className="w-4 h-4 text-green-500" />
                <span>Adjust filters</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Package className="w-4 h-4 text-purple-500" />
                <span>Browse categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //  Products display with count
  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 font-medium">
          Showing{" "}
          <span className="text-gray-800 font-bold">{products.length}</span>{" "}
          product{products.length !== 1 ? "s" : ""}
        </p>

        {/* View Mode Indicator (optional) */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div
            className={`w-2 h-2 rounded-full ${
              viewMode === "grid" ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <span className="font-medium">
            {viewMode === "grid" ? "Grid View" : "List View"}
          </span>
        </div>
      </div>

      {/* Products Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-6"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Load More Section (optional) */}
      {products.length >= 8 && (
        <div className="text-center pt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
