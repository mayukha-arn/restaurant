import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {
  restaurants,
  menuItems,
  menuCategories,
  customers,
  orders,
  orderItems,
  staff,
  inventoryItems,
  diningTables,
} from '../db/schema';

// Restaurant Schemas
export const selectRestaurantSchema = createSelectSchema(restaurants);
export const insertRestaurantSchema = createInsertSchema(restaurants, {
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
  maxCapacity: z.number().int().positive(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateRestaurantSchema = insertRestaurantSchema.partial();

// Menu Category Schemas
export const selectMenuCategorySchema = createSelectSchema(menuCategories);
export const insertMenuCategorySchema = createInsertSchema(menuCategories, {
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().nonnegative(),
}).omit({ id: true, restaurantId: true, createdAt: true });

// Menu Item Schemas
export const selectMenuItemSchema = createSelectSchema(menuItems);
export const insertMenuItemSchema = createInsertSchema(menuItems, {
  name: z.string().min(1).max(255),
  price: z.string().or(z.number()).pipe(z.coerce.number().positive()),
  preparationTime: z.number().int().positive().optional(),
}).omit({ id: true, restaurantId: true, categoryId: true, createdAt: true, updatedAt: true });

export const updateMenuItemSchema = insertMenuItemSchema.partial();

// Customer Schemas
export const selectCustomerSchema = createSelectSchema(customers);
export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
}).omit({
  id: true,
  restaurantId: true,
  loyaltyPoints: true,
  totalOrders: true,
  totalSpent: true,
  lastOrderDate: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCustomerSchema = insertCustomerSchema.partial();

// Order Schemas
export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderSchema = createInsertSchema(orders, {
  subtotal: z.string().or(z.number()).pipe(z.coerce.number().nonnegative()),
  taxAmount: z.string().or(z.number()).pipe(z.coerce.number().nonnegative()).optional(),
  discountAmount: z.string().or(z.number()).pipe(z.coerce.number().nonnegative()).optional(),
  totalAmount: z.string().or(z.number()).pipe(z.coerce.number().positive()),
}).omit({
  id: true,
  restaurantId: true,
  orderNumber: true,
  paymentStatus: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'ready', 'completed', 'cancelled']).optional(),
  paymentStatus: z.enum(['pending', 'completed', 'refunded', 'failed']).optional(),
  specialInstructions: z.string().optional(),
  notes: z.string().optional(),
});

// Order Items Schemas
export const selectOrderItemSchema = createSelectSchema(orderItems);
export const insertOrderItemSchema = createInsertSchema(orderItems, {
  quantity: z.number().int().positive(),
  unitPrice: z.string().or(z.number()).pipe(z.coerce.number().positive()),
}).omit({ id: true, orderId: true, menuItemId: true });

// Staff Schemas
export const selectStaffSchema = createSelectSchema(staff);
export const insertStaffSchema = createInsertSchema(staff, {
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().min(1).max(50),
  hourlyRate: z.string().or(z.number()).pipe(z.coerce.number().positive()).optional(),
}).omit({ id: true, restaurantId: true, createdAt: true });

export const updateStaffSchema = insertStaffSchema.partial();

// Inventory Schemas
export const selectInventoryItemSchema = createSelectSchema(inventoryItems);
export const insertInventoryItemSchema = createInsertSchema(inventoryItems, {
  name: z.string().min(1).max(255),
  quantity: z.string().or(z.number()).pipe(z.coerce.number().nonnegative()),
  unit: z.string().min(1).max(50),
  minThreshold: z.string().or(z.number()).pipe(z.coerce.number().nonnegative()),
  costPerUnit: z.string().or(z.number()).pipe(z.coerce.number().positive()),
}).omit({ id: true, restaurantId: true, createdAt: true, updatedAt: true });

export const updateInventoryItemSchema = insertInventoryItemSchema.partial();

// Dining Table Schemas
export const selectDiningTableSchema = createSelectSchema(diningTables);
export const insertDiningTableSchema = createInsertSchema(diningTables, {
  tableNumber: z.string().min(1).max(50),
  capacity: z.number().int().positive(),
}).omit({ id: true, restaurantId: true, currentOrderId: true, createdAt: true });

export const updateDiningTableSchema = insertDiningTableSchema.partial();

// Query response schemas
export const successResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  });

export const listResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.array(dataSchema),
    pagination: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      pages: z.number(),
    }),
  });

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string(),
});

// Type exports
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type SelectRestaurant = z.infer<typeof selectRestaurantSchema>;

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type SelectMenuItem = z.infer<typeof selectMenuItemSchema>;

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type SelectCustomer = z.infer<typeof selectCustomerSchema>;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type SelectOrder = z.infer<typeof selectOrderSchema>;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type SelectOrderItem = z.infer<typeof selectOrderItemSchema>;
