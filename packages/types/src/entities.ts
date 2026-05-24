export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  logoUrl?: string;
  cuisineType?: string;
  maxCapacity: number;
  isOpen: boolean;
  openingTime?: string;
  closingTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  menuItems?: MenuItem[];
}

export interface MenuItem {
  id: number;
  categoryId: number;
  restaurantId: number;
  name: string;
  description?: string;
  price: string | number;
  imageUrl?: string;
  isAvailable: boolean;
  preparationTime?: number;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  restaurantId: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: string | number;
  lastOrderDate?: string;
  preferences?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface DiningTable {
  id: number;
  restaurantId: number;
  tableNumber: string;
  capacity: number;
  isAvailable: boolean;
  currentOrderId?: number;
  location?: string;
  createdAt: string;
}

export interface Staff {
  id: number;
  restaurantId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  hourlyRate?: string | number;
  isActive: boolean;
  hireDate: string;
  createdAt: string;
}

export interface InventoryItem {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  quantity: string | number;
  unit: string;
  minThreshold: string | number;
  costPerUnit: string | number;
  category?: string;
  lastRestockDate?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}
