/**
 * API Configuration
 * Centralized configuration for API base URL and axios settings
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * API Endpoints
 * Centralized endpoint definitions for easy reference
 */
export const API_ENDPOINTS = {
  health: '/health',
  restaurants: {
    list: '/api/restaurants',
    detail: (id: number) => `/api/restaurants/${id}`,
    create: '/api/restaurants',
    update: (id: number) => `/api/restaurants/${id}`,
    delete: (id: number) => `/api/restaurants/${id}`,
  },
  menuCategories: {
    list: (restaurantId: number) => `/api/menu-categories/restaurant/${restaurantId}`,
    detail: (id: number) => `/api/menu-categories/${id}`,
    create: (restaurantId: number) => `/api/menu-categories/${restaurantId}`,
    update: (id: number) => `/api/menu-categories/${id}`,
    delete: (id: number) => `/api/menu-categories/${id}`,
  },
  menuItems: {
    listByRestaurant: (restaurantId: number) =>
      `/api/menu-items/restaurant/${restaurantId}`,
    listByCategory: (categoryId: number) => `/api/menu-items/category/${categoryId}`,
    detail: (id: number) => `/api/menu-items/${id}`,
    create: (restaurantId: number, categoryId: number) =>
      `/api/menu-items/${restaurantId}/${categoryId}`,
    update: (id: number) => `/api/menu-items/${id}`,
    delete: (id: number) => `/api/menu-items/${id}`,
  },
  orders: {
    listByRestaurant: (restaurantId: number) =>
      `/api/orders/restaurant/${restaurantId}`,
    detail: (id: number) => `/api/orders/${id}`,
    create: (restaurantId: number) => `/api/orders/${restaurantId}`,
    addItem: (orderId: number) => `/api/orders/${orderId}/items`,
    update: (id: number) => `/api/orders/${id}`,
    lookup: (orderNumber: string) => `/api/orders/lookup/${orderNumber}`,
  },
  customers: {
    listByRestaurant: (restaurantId: number) =>
      `/api/customers/restaurant/${restaurantId}`,
    detail: (id: number) => `/api/customers/${id}`,
    create: (restaurantId: number) => `/api/customers/${restaurantId}`,
    update: (id: number) => `/api/customers/${id}`,
    delete: (id: number) => `/api/customers/${id}`,
  },
};
