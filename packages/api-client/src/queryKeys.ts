/**
 * Query Key Factory
 *
 * Centralized, type-safe query key definitions for React Query.
 * Makes it easy to:
 * - Keep query keys consistent
 * - Invalidate cache after mutations
 * - Manage related queries
 *
 * Follows the React Query recommended pattern:
 * https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults
 */

export const queryKeys = {
  all: ['api'] as const,

  // Orders
  orders: () => [...queryKeys.all, 'orders'] as const,
  ordersList: (restaurantId: number) =>
    [...queryKeys.orders(), 'list', restaurantId] as const,
  ordersDetail: (id: number) => [...queryKeys.orders(), 'detail', id] as const,
  ordersLookup: (orderNumber: string) =>
    [...queryKeys.orders(), 'lookup', orderNumber] as const,

  // Menu Categories
  menuCategories: () => [...queryKeys.all, 'menuCategories'] as const,
  menuCategoriesList: (restaurantId: number) =>
    [...queryKeys.menuCategories(), 'list', restaurantId] as const,
  menuCategoriesDetail: (id: number) =>
    [...queryKeys.menuCategories(), 'detail', id] as const,

  // Menu Items
  menuItems: () => [...queryKeys.all, 'menuItems'] as const,
  menuItemsListByRestaurant: (restaurantId: number) =>
    [...queryKeys.menuItems(), 'list', 'restaurant', restaurantId] as const,
  menuItemsListByCategory: (categoryId: number) =>
    [...queryKeys.menuItems(), 'list', 'category', categoryId] as const,
  menuItemsDetail: (id: number) =>
    [...queryKeys.menuItems(), 'detail', id] as const,

  // Customers
  customers: () => [...queryKeys.all, 'customers'] as const,
  customersList: (restaurantId: number) =>
    [...queryKeys.customers(), 'list', restaurantId] as const,
  customersDetail: (id: number) =>
    [...queryKeys.customers(), 'detail', id] as const,

  // Restaurants
  restaurants: () => [...queryKeys.all, 'restaurants'] as const,
  restaurantsList: () => [...queryKeys.restaurants(), 'list'] as const,
  restaurantsDetail: (id: number) =>
    [...queryKeys.restaurants(), 'detail', id] as const,
};

/**
 * Example usage:
 *
 * // In a component:
 * const { data, isLoading } = useQuery({
 *   queryKey: queryKeys.ordersList(restaurantId),
 *   queryFn: () => fetchOrders(restaurantId),
 * });
 *
 * // Invalidating cache after mutation:
 * const { mutate } = useMutation({
 *   mutationFn: updateOrder,
 *   onSuccess: () => {
 *     queryClient.invalidateQueries({
 *       queryKey: queryKeys.ordersList(restaurantId),
 *     });
 *   },
 * });
 */
