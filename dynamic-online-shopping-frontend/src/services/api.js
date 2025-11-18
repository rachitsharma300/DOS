import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

export const productAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post("/products", product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

export const cartAPI = {
  get: () => api.get("/cart"),
  add: (item) => api.post("/cart", item),
  update: (id, item) => api.put(`/cart/${id}`, item),
  remove: (id) => api.delete(`/cart/${id}`),
};

export const orderAPI = {
  place: () => api.post("/orders/place"),
  getAll: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
};

export const paymentAPI = {
  createOrder: (orderId) => api.post(`/payments/create-order/${orderId}`),
  verify: (payload) => api.post("/payments/verify", payload),
};

export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getAllProducts: () => api.get("/admin/products"),
  getAllOrders: () => api.get("/admin/orders"),
  getAllUsers: () => api.get("/admin/users"),
  createProduct: (data) => api.post("/admin/products", data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  updateOrderStatus: (orderId, data) =>
    api.put(`/admin/orders/${orderId}/status`, data),
  updateUserRole: (userId, data) =>
    api.put(`/admin/users/${userId}/role`, data),
};

export default api;
