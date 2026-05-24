import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  decimal,
  boolean,
  varchar,
  pgEnum,
  json,
  index,
} from 'drizzle-orm/pg-core';

// Enums
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed',
  'in_progress',
  'ready',
  'completed',
  'cancelled',
]);

export const orderTypeEnum = pgEnum('order_type', [
  'dine_in',
  'takeout',
  'delivery',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'refunded',
  'failed',
]);

// Restaurants
export const restaurants = pgTable(
  'restaurants',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    description: text('description'),
    logoUrl: varchar('logo_url', { length: 500 }),
    cuisineType: varchar('cuisine_type', { length: 100 }),
    maxCapacity: integer('max_capacity').notNull().default(50),
    isOpen: boolean('is_open').notNull().default(true),
    openingTime: varchar('opening_time', { length: 5 }), // HH:MM format
    closingTime: varchar('closing_time', { length: 5 }), // HH:MM format
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('restaurants_email_idx').on(table.email),
  })
);

// Menu Categories
export const menuCategories = pgTable(
  'menu_categories',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    displayOrder: integer('display_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('menu_categories_restaurant_id_idx').on(table.restaurantId),
  })
);

// Menu Items
export const menuItems = pgTable(
  'menu_items',
  {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id')
      .notNull()
      .references(() => menuCategories.id, { onDelete: 'cascade' }),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    imageUrl: varchar('image_url', { length: 500 }),
    isAvailable: boolean('is_available').notNull().default(true),
    preparationTime: integer('preparation_time'), // in minutes
    isVegetarian: boolean('is_vegetarian').notNull().default(false),
    isGlutenFree: boolean('is_gluten_free').notNull().default(false),
    isSpicy: boolean('is_spicy').notNull().default(false),
    metadata: json('metadata'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    categoryIdx: index('menu_items_category_id_idx').on(table.categoryId),
    restaurantIdx: index('menu_items_restaurant_id_idx').on(table.restaurantId),
  })
);

// Customers
export const customers = pgTable(
  'customers',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    address: text('address'),
    loyaltyPoints: integer('loyalty_points').notNull().default(0),
    totalOrders: integer('total_orders').notNull().default(0),
    totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).notNull().default('0'),
    lastOrderDate: timestamp('last_order_date'),
    preferences: json('preferences'), // dietary restrictions, allergies, etc.
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('customers_restaurant_id_idx').on(table.restaurantId),
    emailIdx: index('customers_email_idx').on(table.email),
  })
);

// Orders
export const orders = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    customerId: integer('customer_id')
      .references(() => customers.id, { onDelete: 'set null' }),
    orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
    status: orderStatusEnum('status').notNull().default('pending'),
    orderType: orderTypeEnum('order_type').notNull().default('dine_in'),
    subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
    taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).notNull().default('0'),
    discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).notNull().default('0'),
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
    paymentMethod: varchar('payment_method', { length: 50 }),
    specialInstructions: text('special_instructions'),
    estimatedCompletionTime: timestamp('estimated_completion_time'),
    completedAt: timestamp('completed_at'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('orders_restaurant_id_idx').on(table.restaurantId),
    customerIdx: index('orders_customer_id_idx').on(table.customerId),
    statusIdx: index('orders_status_idx').on(table.status),
    createdAtIdx: index('orders_created_at_idx').on(table.createdAt),
  })
);

// Order Items (line items)
export const orderItems = pgTable(
  'order_items',
  {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    menuItemId: integer('menu_item_id')
      .notNull()
      .references(() => menuItems.id, { onDelete: 'restrict' }),
    quantity: integer('quantity').notNull().default(1),
    unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
    specialInstructions: text('special_instructions'),
    metadata: json('metadata'),
  },
  (table) => ({
    orderIdx: index('order_items_order_id_idx').on(table.orderId),
    menuItemIdx: index('order_items_menu_item_id_idx').on(table.menuItemId),
  })
);

// Employee Staff
export const staff = pgTable(
  'staff',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phone: varchar('phone', { length: 20 }),
    role: varchar('role', { length: 50 }).notNull(), // manager, chef, server, etc.
    hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
    isActive: boolean('is_active').notNull().default(true),
    hireDate: timestamp('hire_date').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('staff_restaurant_id_idx').on(table.restaurantId),
    emailIdx: index('staff_email_idx').on(table.email),
  })
);

// Inventory
export const inventoryItems = pgTable(
  'inventory_items',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
    unit: varchar('unit', { length: 50 }).notNull(), // kg, liters, pcs, etc.
    minThreshold: decimal('min_threshold', { precision: 10, scale: 2 }).notNull(),
    costPerUnit: decimal('cost_per_unit', { precision: 10, scale: 2 }).notNull(),
    category: varchar('category', { length: 100 }),
    lastRestockDate: timestamp('last_restock_date'),
    expiryDate: timestamp('expiry_date'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('inventory_items_restaurant_id_idx').on(table.restaurantId),
  })
);

// Tables (for seating management)
export const diningTables = pgTable(
  'dining_tables',
  {
    id: serial('id').primaryKey(),
    restaurantId: integer('restaurant_id')
      .notNull()
      .references(() => restaurants.id, { onDelete: 'cascade' }),
    tableNumber: varchar('table_number', { length: 50 }).notNull(),
    capacity: integer('capacity').notNull(),
    isAvailable: boolean('is_available').notNull().default(true),
    currentOrderId: integer('current_order_id').references(() => orders.id, { onDelete: 'set null' }),
    location: varchar('location', { length: 100 }), // window, corner, middle, etc.
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    restaurantIdx: index('dining_tables_restaurant_id_idx').on(table.restaurantId),
  })
);
