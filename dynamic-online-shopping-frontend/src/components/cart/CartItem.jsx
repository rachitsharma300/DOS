import React from "react";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove, updating = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const itemTotal = (item.product?.price || 0) * item.quantity;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        {/*  Product Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-300">
          {item.product?.imageUrl ? (
            <img
              src={item.product.imageUrl}
              alt={item.product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/*  Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg truncate group-hover:text-blue-600 transition-colors">
            {item.product?.title || "Product"}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1">
            {item.product?.description || "Product description"}
          </p>
          <p className="text-blue-600 font-semibold mt-2">
            {formatPrice(item.product?.price || 0)} each
          </p>
        </div>

        {/*  Quantity Controls */}
        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2 border border-gray-200">
          {/* Decrease Button */}
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={updating || item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-50 transition-all duration-200 shadow-sm"
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Quantity Display */}
          <div className="w-12 text-center">
            {updating ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              <span className="font-bold text-gray-800 text-lg">
                {item.quantity}
              </span>
            )}
          </div>

          {/* Increase Button */}
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={updating}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-600 disabled:opacity-50 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/*  Item Total */}
        <div className="text-right min-w-24">
          <p className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(itemTotal)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {item.quantity} × {formatPrice(item.product?.price || 0)}
          </p>
        </div>

        {/*  Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          disabled={updating}
          className="p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 disabled:opacity-50 group/remove"
          title="Remove item from cart"
        >
          <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform" />
        </button>
      </div>

      {/* Stock Status Badge */}
      {item.product?.stock !== undefined && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                item.product.stock > 10
                  ? "bg-green-500"
                  : item.product.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span
              className={`text-xs font-medium ${
                item.product.stock > 10
                  ? "text-green-600"
                  : item.product.stock > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {item.product.stock > 10
                ? "In Stock"
                : item.product.stock > 0
                ? "Low Stock"
                : "Out of Stock"}
            </span>
          </div>

          {/* Subtotal Label */}
          <span className="text-xs text-gray-500 font-medium">Subtotal</span>
        </div>
      )}
    </div>
  );
};

export default CartItem;
