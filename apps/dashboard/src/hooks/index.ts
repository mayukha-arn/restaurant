/**
 * Custom Hooks Export
 *
 * Central export point for all custom hooks and API hooks
 */

// Custom hooks
export { useRestaurantId } from './useRestaurantId';

// Re-export all API hooks from api-client package
export {
  // Orders
  useOrdersList,
  useOrder,
  useCreateOrder,
  useUpdateOrder,
  useOrderLookup,
  // Menu Items
  useMenuItemsListByRestaurant,
  useMenuItemsListByCategory,
  useMenuItem,
  useCreateMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
  // Menu Categories
  useMenuCategoriesList,
  useMenuCategory,
  useCreateMenuCategory,
  useUpdateMenuCategory,
  useDeleteMenuCategory,
  // Customers
  useCustomersList,
  useCustomer,
  useCreateCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
  // Restaurants
  useRestaurantsList,
  useRestaurant,
  useUpdateRestaurant,
} from '@api-client';
