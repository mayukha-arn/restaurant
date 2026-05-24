import { db } from './index';
import {
  restaurants,
  menuCategories,
  menuItems,
  customers,
  diningTables,
} from './schema';

async function seed() {
  console.log('🌱 Starting database seed...');

  // Create restaurant
  const [restaurant] = await db
    .insert(restaurants)
    .values({
      name: 'Vintage Diner',
      address: '123 Main Street, New York, NY 10001',
      phone: '(555) 123-4567',
      email: 'contact@vintagediner.com',
      description: 'A classic American diner with retro charm',
      cuisineType: 'American',
      maxCapacity: 60,
      isOpen: true,
      openingTime: '06:00',
      closingTime: '23:00',
    })
    .returning();

  console.log('✅ Restaurant created:', restaurant.name);

  // Create menu categories
  const [burgersCategory] = await db
    .insert(menuCategories)
    .values({
      restaurantId: restaurant.id,
      name: 'Burgers',
      description: 'Classic handmade burgers',
      displayOrder: 1,
      isActive: true,
    })
    .returning();

  const [friesCategory] = await db
    .insert(menuCategories)
    .values({
      restaurantId: restaurant.id,
      name: 'Fries & Sides',
      description: 'Golden crispy sides',
      displayOrder: 2,
      isActive: true,
    })
    .returning();

  const [drinksCategory] = await db
    .insert(menuCategories)
    .values({
      restaurantId: restaurant.id,
      name: 'Beverages',
      description: 'Classic drinks and shakes',
      displayOrder: 3,
      isActive: true,
    })
    .returning();

  const [dessertsCategory] = await db
    .insert(menuCategories)
    .values({
      restaurantId: restaurant.id,
      name: 'Desserts',
      description: 'Sweet treats and ice cream',
      displayOrder: 4,
      isActive: true,
    })
    .returning();

  console.log('✅ Menu categories created');

  // Create menu items - Burgers
  await db
    .insert(menuItems)
    .values([
      {
        categoryId: burgersCategory.id,
        restaurantId: restaurant.id,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty, melted cheddar, lettuce, tomato, pickles',
        price: '12.99',
        isAvailable: true,
        preparationTime: 10,
        isVegetarian: false,
      },
      {
        categoryId: burgersCategory.id,
        restaurantId: restaurant.id,
        name: 'Double Stack Burger',
        description: 'Two beef patties, double cheese, bacon, onions',
        price: '15.99',
        isAvailable: true,
        preparationTime: 12,
        isVegetarian: false,
      },
      {
        categoryId: burgersCategory.id,
        restaurantId: restaurant.id,
        name: 'Mushroom Swiss Burger',
        description: 'Beef patty, sautéed mushrooms, Swiss cheese',
        price: '14.99',
        isAvailable: true,
        preparationTime: 11,
        isVegetarian: false,
      },
    ])
    .returning();

  // Create menu items - Fries & Sides
  await db
    .insert(menuItems)
    .values([
      {
        categoryId: friesCategory.id,
        restaurantId: restaurant.id,
        name: 'Classic Fries',
        description: 'Golden crispy fries with sea salt',
        price: '4.99',
        isAvailable: true,
        preparationTime: 5,
        isVegetarian: true,
      },
      {
        categoryId: friesCategory.id,
        restaurantId: restaurant.id,
        name: 'Cheese Fries',
        description: 'Crispy fries loaded with melted cheddar',
        price: '6.99',
        isAvailable: true,
        preparationTime: 6,
        isVegetarian: true,
      },
      {
        categoryId: friesCategory.id,
        restaurantId: restaurant.id,
        name: 'Chili Cheese Fries',
        description: 'Fries with chili and melted cheese',
        price: '7.99',
        isAvailable: true,
        preparationTime: 7,
        isVegetarian: false,
      },
    ])
    .returning();

  // Create menu items - Beverages
  await db
    .insert(menuItems)
    .values([
      {
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        name: 'Classic Cola',
        description: 'Ice-cold fountain cola',
        price: '2.99',
        isAvailable: true,
        preparationTime: 1,
        isVegetarian: true,
      },
      {
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        name: 'Vanilla Milkshake',
        description: 'Creamy vanilla shake with whipped cream',
        price: '5.99',
        isAvailable: true,
        preparationTime: 3,
        isVegetarian: true,
      },
      {
        categoryId: drinksCategory.id,
        restaurantId: restaurant.id,
        name: 'Chocolate Milkshake',
        description: 'Rich chocolate shake with whipped cream',
        price: '5.99',
        isAvailable: true,
        preparationTime: 3,
        isVegetarian: true,
      },
    ])
    .returning();

  // Create menu items - Desserts
  await db
    .insert(menuItems)
    .values([
      {
        categoryId: dessertsCategory.id,
        restaurantId: restaurant.id,
        name: 'Vanilla Ice Cream',
        description: 'Creamy vanilla ice cream with cone',
        price: '4.99',
        isAvailable: true,
        preparationTime: 2,
        isVegetarian: true,
      },
      {
        categoryId: dessertsCategory.id,
        restaurantId: restaurant.id,
        name: 'Chocolate Ice Cream',
        description: 'Rich chocolate ice cream with cone',
        price: '4.99',
        isAvailable: true,
        preparationTime: 2,
        isVegetarian: true,
      },
      {
        categoryId: dessertsCategory.id,
        restaurantId: restaurant.id,
        name: 'Strawberry Ice Cream',
        description: 'Fresh strawberry ice cream with cone',
        price: '5.49',
        isAvailable: true,
        preparationTime: 2,
        isVegetarian: true,
      },
    ])
    .returning();

  console.log('✅ Menu items created');

  // Create sample customers
  await db
    .insert(customers)
    .values([
      {
        restaurantId: restaurant.id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '(555) 111-1111',
        address: '456 Oak Ave, New York, NY 10001',
        loyaltyPoints: 250,
        totalOrders: 5,
        totalSpent: '89.95',
      },
      {
        restaurantId: restaurant.id,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '(555) 222-2222',
        address: '789 Pine St, New York, NY 10001',
        loyaltyPoints: 150,
        totalOrders: 3,
        totalSpent: '54.97',
      },
    ])
    .returning();

  console.log('✅ Customers created');

  // Create dining tables
  await db
    .insert(diningTables)
    .values([
      {
        restaurantId: restaurant.id,
        tableNumber: '1',
        capacity: 2,
        isAvailable: true,
        location: 'window',
      },
      {
        restaurantId: restaurant.id,
        tableNumber: '2',
        capacity: 2,
        isAvailable: true,
        location: 'corner',
      },
      {
        restaurantId: restaurant.id,
        tableNumber: '3',
        capacity: 4,
        isAvailable: true,
        location: 'middle',
      },
      {
        restaurantId: restaurant.id,
        tableNumber: '4',
        capacity: 4,
        isAvailable: true,
        location: 'middle',
      },
      {
        restaurantId: restaurant.id,
        tableNumber: '5',
        capacity: 6,
        isAvailable: false,
        location: 'window',
      },
    ])
    .returning();

  console.log('✅ Dining tables created');
  console.log('🎉 Seed completed successfully!');
}

seed().catch(console.error);
