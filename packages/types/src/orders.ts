export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'ready' | 'completed' | 'cancelled';
export type OrderType = 'dine_in' | 'takeout' | 'delivery';
export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Order {
  id: number;
  restaurantId: number;
  customerId?: number;
  orderNumber: string;
  status: OrderStatus;
  orderType: OrderType;
  subtotal: string | number;
  taxAmount: string | number;
  discountAmount: string | number;
  totalAmount: string | number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  specialInstructions?: string;
  estimatedCompletionTime?: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: string | number;
  specialInstructions?: string;
  metadata?: Record<string, any>;
  menuItem?: {
    id: number;
    name: string;
    price: string | number;
    description?: string;
  };
}

export interface CreateOrderPayload {
  customerId?: number;
  orderType: OrderType;
  subtotal: number;
  taxAmount?: number;
  discountAmount?: number;
  totalAmount: number;
  paymentMethod?: string;
  specialInstructions?: string;
  notes?: string;
}

export interface UpdateOrderPayload {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  specialInstructions?: string;
  notes?: string;
}

export interface AddOrderItemPayload {
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}
