/**
 * Centralized API Configuration
 * Update the BASE_URL to match your backend server
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const API_ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_DETAIL: (id) => `${API_BASE_URL}/products/${id}`,
  
  // Users/Auth
  LOGIN: `${API_BASE_URL}/users/auth/login`,
  REGISTER: `${API_BASE_URL}/users/auth/register`,
  GET_USER: (id) => `${API_BASE_URL}/users/${id}`,
  UPDATE_USER: (id) => `${API_BASE_URL}/users/${id}`,
  
  // Cart
  GET_CART: (userId) => `${API_BASE_URL}/cart/${userId}`,
  ADD_TO_CART: `${API_BASE_URL}/cart`,
  UPDATE_CART: (id) => `${API_BASE_URL}/cart/${id}`,
  DELETE_CART_ITEM: (id) => `${API_BASE_URL}/cart/${id}`,
  
  // Wishlist
  GET_WISHLIST: (userId) => `${API_BASE_URL}/wishlist/${userId}`,
  ADD_TO_WISHLIST: `${API_BASE_URL}/wishlist`,
  REMOVE_FROM_WISHLIST: (id) => `${API_BASE_URL}/wishlist/${id}`,
  
  // Orders
  CREATE_ORDER: `${API_BASE_URL}/orders`,
  GET_ORDERS: (userId) => `${API_BASE_URL}/orders?userId=${userId}`,
  GET_ORDER_DETAIL: (id) => `${API_BASE_URL}/orders/${id}`,
  UPDATE_ORDER_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
  CANCEL_ORDER: (id) => `${API_BASE_URL}/orders/${id}/cancel`,
  
  // Contact
  SUBMIT_CONTACT: `${API_BASE_URL}/contact`,
  
  // Email
  SEND_EMAIL: `${API_BASE_URL}/send-email`,
};

export { API_BASE_URL, API_ENDPOINTS };
