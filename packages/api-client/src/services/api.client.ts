/**
 * API Client Service
 *
 * Low-level HTTP client for communicating with the backend API.
 * Uses axios with base configuration from config/api.ts
 *
 * All API responses have the format:
 * {
 *   success: true,
 *   data: {...}
 * }
 */

import axios, { AxiosError } from 'axios';
import {
  type Restaurant,
  type MenuItem,
  type MenuCategory,
  type Order,
  type Customer,
  type ApiResponse,
} from '@types';

// Get API base URL from environment or use default
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8787';

// Create axios instance with base config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Helper function to extract data from API response
 * The backend wraps all responses in { success, data } format
 */
const extractData = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error('API request failed');
  }
  return response.data;
};

/**
 * ============================================================================
 * ORDERS API
 * ============================================================================
 */

export const ordersApi = {
  /**
   * Get all orders for a restaurant
   */
  list: async (restaurantId: number): Promise<Order[]> => {
    const response = await apiClient.get<ApiResponse<Order[]>>(
      `/api/orders/restaurant/${restaurantId}`
    );
    return extractData(response.data);
  },

  /**
   * Get a single order by ID
   */
  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`);
    return extractData(response.data);
  },

  /**
   * Create a new order
   */
  create: async (
    restaurantId: number,
    data: {
      customerId?: number;
      orderType: 'dine_in' | 'takeout' | 'delivery';
      subtotal: number;
      taxAmount?: number;
      discountAmount?: number;
      totalAmount: number;
      paymentMethod?: string;
      specialInstructions?: string;
      notes?: string;
    }
  ): Promise<Order> => {
    const response = await apiClient.post<ApiResponse<Order>>(
      `/api/orders/${restaurantId}`,
      data
    );
    return extractData(response.data);
  },

  /**
   * Update an order (status, payment, notes)
   */
  update: async (
    id: number,
    data: {
      status?: 'pending' | 'confirmed' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
      paymentStatus?: 'pending' | 'completed' | 'refunded' | 'failed';
      specialInstructions?: string;
      notes?: string;
    }
  ): Promise<Order> => {
    const response = await apiClient.put<ApiResponse<Order>>(`/api/orders/${id}`, data);
    return extractData(response.data);
  },

  /**
   * Look up an order by order number
   */
  lookup: async (orderNumber: string): Promise<Order> => {
    const response = await apiClient.get<ApiResponse<Order>>(
      `/api/orders/lookup/${orderNumber}`
    );
    return extractData(response.data);
  },
};

/**
 * ============================================================================
 * MENU ITEMS API
 * ============================================================================
 */

export const menuItemsApi = {
  /**
   * Get all menu items for a restaurant
   */
  listByRestaurant: async (restaurantId: number): Promise<MenuItem[]> => {
    const response = await apiClient.get<ApiResponse<MenuItem[]>>(
      `/api/menu-items/restaurant/${restaurantId}`
    );
    return extractData(response.data);
  },

  /**
   * Get menu items in a specific category
   */
  listByCategory: async (categoryId: number): Promise<MenuItem[]> => {
    const response = await apiClient.get<ApiResponse<MenuItem[]>>(
      `/api/menu-items/category/${categoryId}`
    );
    return extractData(response.data);
  },

  /**
   * Get a single menu item
   */
  getById: async (id: number): Promise<MenuItem> => {
    const response = await apiClient.get<ApiResponse<MenuItem>>(`/api/menu-items/${id}`);
    return extractData(response.data);
  },

  /**
   * Create a new menu item
   */
  create: async (
    restaurantId: number,
    categoryId: number,
    data: {
      name: string;
      description?: string;
      price: number;
      imageUrl?: string;
      isAvailable?: boolean;
      preparationTime?: number;
      isVegetarian?: boolean;
      isGlutenFree?: boolean;
      isSpicy?: boolean;
    }
  ): Promise<MenuItem> => {
    const response = await apiClient.post<ApiResponse<MenuItem>>(
      `/api/menu-items/${restaurantId}/${categoryId}`,
      data
    );
    return extractData(response.data);
  },

  /**
   * Update a menu item
   */
  update: async (id: number, data: Partial<MenuItem>): Promise<MenuItem> => {
    const response = await apiClient.put<ApiResponse<MenuItem>>(`/api/menu-items/${id}`, data);
    return extractData(response.data);
  },

  /**
   * Delete a menu item
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/menu-items/${id}`);
  },
};

/**
 * ============================================================================
 * MENU CATEGORIES API
 * ============================================================================
 */

export const menuCategoriesApi = {
  /**
   * Get all menu categories for a restaurant
   */
  list: async (restaurantId: number): Promise<MenuCategory[]> => {
    const response = await apiClient.get<ApiResponse<MenuCategory[]>>(
      `/api/menu-categories/restaurant/${restaurantId}`
    );
    return extractData(response.data);
  },

  /**
   * Get a single menu category
   */
  getById: async (id: number): Promise<MenuCategory> => {
    const response = await apiClient.get<ApiResponse<MenuCategory>>(
      `/api/menu-categories/${id}`
    );
    return extractData(response.data);
  },

  /**
   * Create a new menu category
   */
  create: async (
    restaurantId: number,
    data: {
      name: string;
      description?: string;
      displayOrder?: number;
      isActive?: boolean;
    }
  ): Promise<MenuCategory> => {
    const response = await apiClient.post<ApiResponse<MenuCategory>>(
      `/api/menu-categories/${restaurantId}`,
      data
    );
    return extractData(response.data);
  },

  /**
   * Update a menu category
   */
  update: async (id: number, data: Partial<MenuCategory>): Promise<MenuCategory> => {
    const response = await apiClient.put<ApiResponse<MenuCategory>>(
      `/api/menu-categories/${id}`,
      data
    );
    return extractData(response.data);
  },

  /**
   * Delete a menu category
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/menu-categories/${id}`);
  },
};

/**
 * ============================================================================
 * CUSTOMERS API
 * ============================================================================
 */

export const customersApi = {
  /**
   * Get all customers for a restaurant
   */
  list: async (restaurantId: number): Promise<Customer[]> => {
    const response = await apiClient.get<ApiResponse<Customer[]>>(
      `/api/customers/restaurant/${restaurantId}`
    );
    return extractData(response.data);
  },

  /**
   * Get a single customer
   */
  getById: async (id: number): Promise<Customer> => {
    const response = await apiClient.get<ApiResponse<Customer>>(`/api/customers/${id}`);
    return extractData(response.data);
  },

  /**
   * Create a new customer
   */
  create: async (
    restaurantId: number,
    data: {
      firstName: string;
      lastName: string;
      email?: string;
      phone?: string;
      address?: string;
      preferences?: Record<string, any>;
    }
  ): Promise<Customer> => {
    const response = await apiClient.post<ApiResponse<Customer>>(
      `/api/customers/${restaurantId}`,
      data
    );
    return extractData(response.data);
  },

  /**
   * Update a customer
   */
  update: async (id: number, data: Partial<Customer>): Promise<Customer> => {
    const response = await apiClient.put<ApiResponse<Customer>>(`/api/customers/${id}`, data);
    return extractData(response.data);
  },

  /**
   * Delete a customer
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/customers/${id}`);
  },
};

/**
 * ============================================================================
 * RESTAURANTS API
 * ============================================================================
 */

export const restaurantsApi = {
  /**
   * Get all restaurants
   */
  list: async (): Promise<Restaurant[]> => {
    const response = await apiClient.get<ApiResponse<Restaurant[]>>('/api/restaurants');
    return extractData(response.data);
  },

  /**
   * Get a single restaurant
   */
  getById: async (id: number): Promise<Restaurant> => {
    const response = await apiClient.get<ApiResponse<Restaurant>>(`/api/restaurants/${id}`);
    return extractData(response.data);
  },

  /**
   * Update a restaurant
   */
  update: async (id: number, data: Partial<Restaurant>): Promise<Restaurant> => {
    const response = await apiClient.put<ApiResponse<Restaurant>>(`/api/restaurants/${id}`, data);
    return extractData(response.data);
  },
};
