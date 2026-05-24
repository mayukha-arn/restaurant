/**
 * API Client Service
 *
 * Low-level HTTP client for communicating with the backend API.
 * Supports both real API (axios) and mock API (localStorage-based) for web deployment.
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
} from '@restaurant/types';
import mockApi from './mock-api';

// Get API base URL from Vite environment or use default
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:8787';

// Always use mock API in browser (no backend available for GitHub Pages)
const USE_MOCK_API = typeof window !== 'undefined';

// Create axios instance with base config (used only in real API mode)
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
 * Wrapper function that routes to either mock API or real API
 */
const apiCall = async <T,>(
  mockFn: () => Promise<ApiResponse<T> | { success: boolean; data: T[] }>,
  realFn: () => Promise<any>
): Promise<T | T[]> => {
  if (USE_MOCK_API) {
    const response = await mockFn();
    if ('data' in response && Array.isArray(response.data)) {
      return response.data;
    }
    return extractData(response as ApiResponse<T>);
  }
  const response = await realFn();
  return extractData(response.data);
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
    return apiCall(
      () => mockApi.getOrdersByRestaurant(restaurantId),
      () => apiClient.get<ApiResponse<Order[]>>(
        `/api/orders/restaurant/${restaurantId}`
      )
    ) as Promise<Order[]>;
  },

  /**
   * Get a single order by ID
   */
  getById: async (id: number): Promise<Order> => {
    return apiCall(
      () => mockApi.getOrder(id),
      () => apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`)
    ) as Promise<Order>;
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
    return apiCall(
      () => mockApi.getOrdersByRestaurant(restaurantId),
      () => apiClient.post<ApiResponse<Order>>(
        `/api/orders/${restaurantId}`,
        data
      )
    ) as Promise<Order>;
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
    return apiCall(
      () => mockApi.updateOrder(id, data),
      () => apiClient.put<ApiResponse<Order>>(`/api/orders/${id}`, data)
    ) as Promise<Order>;
  },

  /**
   * Look up an order by order number
   */
  lookup: async (orderNumber: string): Promise<Order> => {
    return apiCall(
      () => mockApi.getOrdersByRestaurant(1).then(
        (response) => {
          const order = (response as any).data?.find(
            (o: any) => o.orderNumber === orderNumber
          );
          return order
            ? { success: true, data: order }
            : { success: false, error: 'Not found' };
        }
      ),
      () => apiClient.get<ApiResponse<Order>>(
        `/api/orders/lookup/${orderNumber}`
      )
    ) as Promise<Order>;
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
    return apiCall(
      () => mockApi.getMenuItemsByRestaurant(restaurantId),
      () => apiClient.get<ApiResponse<MenuItem[]>>(
        `/api/menu-items/restaurant/${restaurantId}`
      )
    ) as Promise<MenuItem[]>;
  },

  /**
   * Get menu items in a specific category
   */
  listByCategory: async (categoryId: number): Promise<MenuItem[]> => {
    return apiCall(
      () => mockApi.getMenuItemsByCategory(categoryId),
      () => apiClient.get<ApiResponse<MenuItem[]>>(
        `/api/menu-items/category/${categoryId}`
      )
    ) as Promise<MenuItem[]>;
  },

  /**
   * Get a single menu item
   */
  getById: async (id: number): Promise<MenuItem> => {
    return apiCall(
      () => mockApi.getMenuItem(id),
      () => apiClient.get<ApiResponse<MenuItem>>(`/api/menu-items/${id}`)
    ) as Promise<MenuItem>;
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
    return apiCall(
      () => mockApi.getMenuCategories(restaurantId),
      () => apiClient.get<ApiResponse<MenuCategory[]>>(
        `/api/menu-categories/restaurant/${restaurantId}`
      )
    ) as Promise<MenuCategory[]>;
  },

  /**
   * Get a single menu category
   */
  getById: async (id: number): Promise<MenuCategory> => {
    return apiCall(
      () => mockApi.getMenuCategory(id),
      () => apiClient.get<ApiResponse<MenuCategory>>(
        `/api/menu-categories/${id}`
      )
    ) as Promise<MenuCategory>;
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
    return apiCall(
      () => mockApi.getCustomers(restaurantId),
      () => apiClient.get<ApiResponse<Customer[]>>(
        `/api/customers/restaurant/${restaurantId}`
      )
    ) as Promise<Customer[]>;
  },

  /**
   * Get a single customer
   */
  getById: async (id: number): Promise<Customer> => {
    return apiCall(
      () => mockApi.getCustomer(id),
      () => apiClient.get<ApiResponse<Customer>>(`/api/customers/${id}`)
    ) as Promise<Customer>;
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
    return apiCall(
      () => mockApi.getRestaurants(),
      () => apiClient.get<ApiResponse<Restaurant[]>>('/api/restaurants')
    ) as Promise<Restaurant[]>;
  },

  /**
   * Get a single restaurant
   */
  getById: async (id: number): Promise<Restaurant> => {
    return apiCall(
      () => mockApi.getRestaurant(id),
      () => apiClient.get<ApiResponse<Restaurant>>(`/api/restaurants/${id}`)
    ) as Promise<Restaurant>;
  },

  /**
   * Update a restaurant
   */
  update: async (id: number, data: Partial<Restaurant>): Promise<Restaurant> => {
    return apiCall(
      () => mockApi.updateRestaurant(id, data),
      () => apiClient.put<ApiResponse<Restaurant>>(`/api/restaurants/${id}`, data)
    ) as Promise<Restaurant>;
  },
};
