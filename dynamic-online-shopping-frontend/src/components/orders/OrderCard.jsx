import React from "react";
import {
  Package,
  Calendar,
  IndianRupee,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OrderCard = ({ order, onClick }) => {
  //  Status styling with icons
  const getStatusConfig = (status) => {
    switch (status) {
      case "PAID":
        return {
          style: "bg-emerald-50 border-emerald-200 text-emerald-700",
          icon: CheckCircle,
          label: "Payment Completed",
        };
      case "PENDING":
        return {
          style: "bg-amber-50 border-amber-200 text-amber-700",
          icon: Clock,
          label: "Pending Payment",
        };
      case "CANCELLED":
        return {
          style: "bg-red-50 border-red-200 text-red-700",
          icon: XCircle,
          label: "Cancelled",
        };
      case "PROCESSING":
        return {
          style: "bg-blue-50 border-blue-200 text-blue-700",
          icon: Package,
          label: "Processing",
        };
      case "SHIPPED":
        return {
          style: "bg-purple-50 border-purple-200 text-purple-700",
          icon: Package,
          label: "Shipped",
        };
      case "DELIVERED":
        return {
          style: "bg-green-50 border-green-200 text-green-700",
          icon: CheckCircle,
          label: "Delivered",
        };
      default:
        return {
          style: "bg-gray-50 border-gray-200 text-gray-700",
          icon: Package,
          label: status,
        };
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

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate total items
  const totalItems =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      <div className="p-6">
        {/* Order Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                <Package className="w-4 h-4" />
                <span>
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/*  Status Badge */}
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${statusConfig.style} shadow-sm`}
            >
              <StatusIcon className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {statusConfig.label}
              </span>
            </div>

            <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Date */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Order Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <IndianRupee className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Amount</p>
              <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(order.totalAmount)}
              </p>
            </div>
          </div>

          {/* Payment ID */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Payment ID</p>
              <p className="text-sm font-semibold text-gray-800 font-mono">
                {order.razorpayOrderId
                  ? order.razorpayOrderId.slice(0, 8) + "..."
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Items Preview */}
        {order.items && order.items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Items in this order
            </p>
            <div className="flex flex-wrap gap-2">
              {order.items.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg border border-blue-100 shadow-sm"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.product?.title?.slice(0, 20)}...
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {item.quantity}
                    </span>
                  )}
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    +{order.items.length - 4} more items
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Progress (Optional) */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span
              className={`font-medium ${
                order.status === "PAID" ||
                order.status === "PROCESSING" ||
                order.status === "SHIPPED" ||
                order.status === "DELIVERED"
                  ? "text-blue-600"
                  : ""
              }`}
            >
              Ordered
            </span>
            <span
              className={`font-medium ${
                order.status === "PROCESSING" ||
                order.status === "SHIPPED" ||
                order.status === "DELIVERED"
                  ? "text-blue-600"
                  : ""
              }`}
            >
              Processing
            </span>
            <span
              className={`font-medium ${
                order.status === "SHIPPED" || order.status === "DELIVERED"
                  ? "text-blue-600"
                  : ""
              }`}
            >
              Shipped
            </span>
            <span
              className={`font-medium ${
                order.status === "DELIVERED" ? "text-blue-600" : ""
              }`}
            >
              Delivered
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-500"
              style={{
                width:
                  order.status === "PAID"
                    ? "25%"
                    : order.status === "PROCESSING"
                    ? "50%"
                    : order.status === "SHIPPED"
                    ? "75%"
                    : order.status === "DELIVERED"
                    ? "100%"
                    : "0%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
