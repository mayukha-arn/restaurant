/**
 * Mock API Service with localStorage Persistence
 *
 * Provides all endpoints from the real API but stores data in browser localStorage.
 * This allows the app to work completely in the browser without a backend server.
 *
 * All data is persisted across page reloads using localStorage.
 * The service returns data in the same format as the real API.
 */

// ============================================
// DATA TYPES
// ============================================

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

interface ListResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// ============================================
// MOCK DATA STORAGE
// ============================================

const STORAGE_KEY = 'restaurant_dashboard_mock_data';

interface MockDataStore {
  restaurant: any;
  categories: any[];
  items: any[];
  customers: any[];
  orders: any[];
}

// Initialize with sample data
const DEFAULT_DATA: MockDataStore = {
  restaurant: {
    id: 1,
    name: 'The Retro Diner',
    address: '123 Main St, Springfield',
    phone: '555-0123',
    email: 'info@retrodiner.com',
    description: 'Classic American diner with vintage charm',
    cuisineType: 'American',
    maxCapacity: 50,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '23:00',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  categories: [
    {
      id: 1,
      restaurantId: 1,
      name: 'Appetizers',
      description: 'Start your meal right',
      displayOrder: 1,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      restaurantId: 1,
      name: 'Burgers',
      description: 'Juicy and delicious',
      displayOrder: 2,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 3,
      restaurantId: 1,
      name: 'Desserts',
      description: 'Sweet treats',
      displayOrder: 3,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 4,
      restaurantId: 1,
      name: 'Beverages',
      description: 'Drinks and refreshments',
      displayOrder: 4,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ],
  items: [
    {
      id: 1,
      categoryId: 1,
      restaurantId: 1,
      name: 'Fried Pickles',
      description: 'Crispy fried pickle spears with ranch dip',
      price: '4.99',
      isAvailable: true,
      preparationTime: 10,
      isVegetarian: true,
      isGlutenFree: false,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      categoryId: 1,
      restaurantId: 1,
      name: 'Mozzarella Sticks',
      description: 'Golden fried mozzarella with marinara sauce',
      price: '5.99',
      isAvailable: true,
      preparationTime: 12,
      isVegetarian: true,
      isGlutenFree: false,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 3,
      categoryId: 2,
      restaurantId: 1,
      name: 'Classic Burger',
      description: 'Half pound beef patty with lettuce, tomato, onion, pickles',
      price: '9.99',
      isAvailable: true,
      preparationTime: 15,
      isVegetarian: false,
      isGlutenFree: false,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 4,
      categoryId: 2,
      restaurantId: 1,
      name: 'Spicy Jalapeño Burger',
      description: 'Beef patty with jalapeños, pepper jack, spicy sauce',
      price: '10.99',
      isAvailable: true,
      preparationTime: 15,
      isVegetarian: false,
      isGlutenFree: false,
      isSpicy: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 5,
      categoryId: 2,
      restaurantId: 1,
      name: 'Veggie Burger',
      description: 'Plant-based patty with fresh vegetables',
      price: '8.99',
      isAvailable: true,
      preparationTime: 12,
      isVegetarian: true,
      isGlutenFree: false,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 6,
      categoryId: 3,
      restaurantId: 1,
      name: 'Classic Milkshake',
      description: 'Vanilla, chocolate, or strawberry',
      price: '3.99',
      isAvailable: true,
      preparationTime: 5,
      isVegetarian: true,
      isGlutenFree: true,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 7,
      categoryId: 3,
      restaurantId: 1,
      name: 'Apple Pie à la Mode',
      description: 'Warm apple pie with vanilla ice cream',
      price: '4.99',
      isAvailable: true,
      preparationTime: 10,
      isVegetarian: true,
      isGlutenFree: false,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 8,
      categoryId: 4,
      restaurantId: 1,
      name: 'Fresh Lemonade',
      description: 'Freshly squeezed lemon juice',
      price: '2.49',
      isAvailable: true,
      preparationTime: 3,
      isVegetarian: true,
      isGlutenFree: true,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 9,
      categoryId: 4,
      restaurantId: 1,
      name: 'Iced Coffee',
      description: 'Cold brew with ice and your choice of creamer',
      price: '2.99',
      isAvailable: true,
      preparationTime: 2,
      isVegetarian: true,
      isGlutenFree: true,
      isSpicy: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ],
  customers: [
    {
      id: 1,
      restaurantId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-1234',
      address: '123 Oak St',
      loyaltyPoints: 150,
      totalOrders: 5,
      totalSpent: '89.95',
      lastOrderDate: '2024-05-20T18:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-05-20T18:30:00Z',
    },
    {
      id: 2,
      restaurantId: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '555-5678',
      address: '456 Elm St',
      loyaltyPoints: 275,
      totalOrders: 12,
      totalSpent: '189.50',
      lastOrderDate: '2024-05-22T19:00:00Z',
      createdAt: '2024-02-15T00:00:00Z',
      updatedAt: '2024-05-22T19:00:00Z',
    },
    {
      id: 3,
      restaurantId: 1,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      phone: '555-9012',
      address: '789 Main St',
      loyaltyPoints: 100,
      totalOrders: 3,
      totalSpent: '49.97',
      lastOrderDate: '2024-05-19T12:30:00Z',
      createdAt: '2024-03-10T00:00:00Z',
      updatedAt: '2024-05-19T12:30:00Z',
    },
  ],
  orders: [
    {
      id: 1,
      restaurantId: 1,
      customerId: 1,
      orderNumber: '#ORD-001',
      status: 'pending',
      orderType: 'dine-in',
      subtotal: '29.97',
      taxAmount: '2.40',
      discountAmount: '0.00',
      totalAmount: '32.37',
      paymentStatus: 'unpaid',
      paymentMethod: null,
      specialInstructions: 'No onions',
      estimatedCompletionTime: null,
      completedAt: null,
      notes: null,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      orderItems: [
        {
          id: 1,
          orderId: 1,
          menuItemId: 3,
          quantity: 1,
          unitPrice: '9.99',
          specialInstructions: 'No onions',
          menuItem: { id: 3, name: 'Classic Burger', price: '9.99' },
        },
        {
          id: 2,
          orderId: 1,
          menuItemId: 6,
          quantity: 2,
          unitPrice: '3.99',
          specialInstructions: null,
          menuItem: { id: 6, name: 'Classic Milkshake', price: '3.99' },
        },
      ],
    },
    {
      id: 2,
      restaurantId: 1,
      customerId: 2,
      orderNumber: '#ORD-002',
      status: 'confirmed',
      orderType: 'takeout',
      subtotal: '14.98',
      taxAmount: '1.20',
      discountAmount: '0.00',
      totalAmount: '16.18',
      paymentStatus: 'paid',
      paymentMethod: 'credit_card',
      specialInstructions: null,
      estimatedCompletionTime: '2024-05-23T20:15:00Z',
      completedAt: null,
      notes: null,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString(),
      orderItems: [
        {
          id: 3,
          orderId: 2,
          menuItemId: 4,
          quantity: 1,
          unitPrice: '10.99',
          specialInstructions: null,
          menuItem: { id: 4, name: 'Spicy Jalapeño Burger', price: '10.99' },
        },
        {
          id: 4,
          orderId: 2,
          menuItemId: 1,
          quantity: 1,
          unitPrice: '4.99',
          specialInstructions: null,
          menuItem: { id: 1, name: 'Fried Pickles', price: '4.99' },
        },
      ],
    },
  ],
};

// ============================================
// STORAGE FUNCTIONS
// ============================================

function getStoredData(): MockDataStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_DATA;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return DEFAULT_DATA;
  }
}

function saveStoredData(data: MockDataStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

function resetStoredData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting localStorage:', error);
  }
}

// ============================================
// API ENDPOINTS
// ============================================

export const mockApi = {
  // ============================================
  // RESTAURANTS ENDPOINTS
  // ============================================

  async getRestaurants(): Promise<ListResponse<any>> {
    await delay(300);
    const data = getStoredData();
    return {
      success: true,
      data: [data.restaurant],
    };
  },

  async getRestaurant(id: number): Promise<ApiResponse<any>> {
    await delay(200);
    const data = getStoredData();
    if (data.restaurant.id === id) {
      return {
        success: true,
        data: data.restaurant,
      };
    }
    return {
      success: false,
      error: 'Restaurant not found',
      code: 'NOT_FOUND',
    };
  },

  async updateRestaurant(id: number, updates: any): Promise<ApiResponse<any>> {
    await delay(300);
    const data = getStoredData();
    if (data.restaurant.id === id) {
      data.restaurant = {
        ...data.restaurant,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveStoredData(data);
      return {
        success: true,
        data: data.restaurant,
      };
    }
    return {
      success: false,
      error: 'Restaurant not found',
      code: 'NOT_FOUND',
    };
  },

  // ============================================
  // MENU CATEGORIES ENDPOINTS
  // ============================================

  async getMenuCategories(restaurantId: number): Promise<ListResponse<any>> {
    await delay(250);
    const data = getStoredData();
    const categories = data.categories.filter(
      (c) => c.restaurantId === restaurantId
    );
    return {
      success: true,
      data: categories,
    };
  },

  async getMenuCategory(id: number): Promise<ApiResponse<any>> {
    await delay(150);
    const data = getStoredData();
    const category = data.categories.find((c) => c.id === id);
    if (category) {
      return {
        success: true,
        data: {
          ...category,
          menuItems: data.items.filter((i) => i.categoryId === id),
        },
      };
    }
    return {
      success: false,
      error: 'Category not found',
      code: 'NOT_FOUND',
    };
  },

  // ============================================
  // MENU ITEMS ENDPOINTS
  // ============================================

  async getMenuItemsByRestaurant(
    restaurantId: number
  ): Promise<ListResponse<any>> {
    await delay(300);
    const data = getStoredData();
    const items = data.items.filter((i) => i.restaurantId === restaurantId);
    return {
      success: true,
      data: items,
    };
  },

  async getMenuItemsByCategory(categoryId: number): Promise<ListResponse<any>> {
    await delay(250);
    const data = getStoredData();
    const items = data.items.filter((i) => i.categoryId === categoryId);
    return {
      success: true,
      data: items,
    };
  },

  async getMenuItem(id: number): Promise<ApiResponse<any>> {
    await delay(150);
    const data = getStoredData();
    const item = data.items.find((i) => i.id === id);
    if (item) {
      return {
        success: true,
        data: item,
      };
    }
    return {
      success: false,
      error: 'Menu item not found',
      code: 'NOT_FOUND',
    };
  },

  // ============================================
  // CUSTOMERS ENDPOINTS
  // ============================================

  async getCustomers(restaurantId: number): Promise<ListResponse<any>> {
    await delay(300);
    const data = getStoredData();
    const customers = data.customers.filter(
      (c) => c.restaurantId === restaurantId
    );
    return {
      success: true,
      data: customers,
    };
  },

  async getCustomer(id: number): Promise<ApiResponse<any>> {
    await delay(150);
    const data = getStoredData();
    const customer = data.customers.find((c) => c.id === id);
    if (customer) {
      return {
        success: true,
        data: customer,
      };
    }
    return {
      success: false,
      error: 'Customer not found',
      code: 'NOT_FOUND',
    };
  },

  // ============================================
  // ORDERS ENDPOINTS
  // ============================================

  async getOrdersByRestaurant(restaurantId: number): Promise<ListResponse<any>> {
    await delay(300);
    const data = getStoredData();
    const orders = data.orders.filter((o) => o.restaurantId === restaurantId);
    return {
      success: true,
      data: orders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    };
  },

  async getOrder(id: number): Promise<ApiResponse<any>> {
    await delay(150);
    const data = getStoredData();
    const order = data.orders.find((o) => o.id === id);
    if (order) {
      return {
        success: true,
        data: order,
      };
    }
    return {
      success: false,
      error: 'Order not found',
      code: 'NOT_FOUND',
    };
  },

  async updateOrder(id: number, updates: any): Promise<ApiResponse<any>> {
    await delay(300);
    const data = getStoredData();
    const order = data.orders.find((o) => o.id === id);
    if (order) {
      Object.assign(order, updates, {
        updatedAt: new Date().toISOString(),
      });
      saveStoredData(data);
      return {
        success: true,
        data: order,
      };
    }
    return {
      success: false,
      error: 'Order not found',
      code: 'NOT_FOUND',
    };
  },

  // ============================================
  // UTILITY
  // ============================================

  resetData(): void {
    resetStoredData();
  },

  getCurrentData(): MockDataStore {
    return getStoredData();
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================
// EXPORT
// ============================================

export default mockApi;
