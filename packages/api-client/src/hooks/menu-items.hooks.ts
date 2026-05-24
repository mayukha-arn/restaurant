/**
 * Menu Items Hooks
 *
 * React Query hooks for menu items API endpoints
 */

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { menuItemsApi } from '../services/api.client';
import { queryKeys } from '../queryKeys';
import type { MenuItem } from '@restaurant/types';

/**
 * Get all menu items for a restaurant
 */
export const useMenuItemsListByRestaurant = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.menuItemsListByRestaurant(restaurantId),
    queryFn: () => menuItemsApi.listByRestaurant(restaurantId),
  });
};

/**
 * Get menu items in a specific category
 */
export const useMenuItemsListByCategory = (categoryId: number | null) => {
  return useQuery({
    queryKey: categoryId ? queryKeys.menuItemsListByCategory(categoryId) : ['menu-items-disabled'],
    queryFn: categoryId
      ? () => menuItemsApi.listByCategory(categoryId)
      : () => Promise.reject('No category ID'),
    enabled: !!categoryId,
  });
};

/**
 * Get a single menu item
 */
export const useMenuItem = (id: number | null) => {
  return useQuery({
    queryKey: id ? queryKeys.menuItemsDetail(id) : ['menu-items-disabled'],
    queryFn: id ? () => menuItemsApi.getById(id) : () => Promise.reject('No ID'),
    enabled: !!id,
  });
};

/**
 * Create a new menu item
 */
export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      categoryId,
      data,
    }: {
      restaurantId: number;
      categoryId: number;
      data: Parameters<typeof menuItemsApi.create>[2];
    }) => menuItemsApi.create(restaurantId, categoryId, data),
    onSuccess: (newItem, { restaurantId, categoryId }) => {
      // Invalidate both restaurant-wide and category-specific lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuItemsListByRestaurant(restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuItemsListByCategory(categoryId),
      });
      // Cache the new item
      queryClient.setQueryData(queryKeys.menuItemsDetail(newItem.id), newItem);
    },
  });
};

/**
 * Update a menu item
 */
export const useUpdateMenuItem = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MenuItem> }) =>
      menuItemsApi.update(id, data),
    onSuccess: (updatedItem) => {
      // Update in cache
      queryClient.setQueryData(queryKeys.menuItemsDetail(updatedItem.id), updatedItem);
      // Invalidate list to sync
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuItemsListByRestaurant(restaurantId),
      });
    },
  });
};

/**
 * Delete a menu item
 */
export const useDeleteMenuItem = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menuItemsApi.delete(id),
    onSuccess: () => {
      // Invalidate lists to trigger refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuItemsListByRestaurant(restaurantId),
      });
    },
  });
};
