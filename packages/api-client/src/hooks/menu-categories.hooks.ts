/**
 * Menu Categories Hooks
 *
 * React Query hooks for menu categories API endpoints
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuCategoriesApi } from '../services/api.client';
import { queryKeys } from '../queryKeys';
import type { MenuCategory } from '@types';

/**
 * Get all menu categories for a restaurant
 */
export const useMenuCategoriesList = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.menuCategoriesList(restaurantId),
    queryFn: () => menuCategoriesApi.list(restaurantId),
  });
};

/**
 * Get a single menu category with its items
 */
export const useMenuCategory = (id: number | null) => {
  return useQuery({
    queryKey: id ? queryKeys.menuCategoriesDetail(id) : ['menu-categories-disabled'],
    queryFn: id
      ? () => menuCategoriesApi.getById(id)
      : () => Promise.reject('No category ID'),
    enabled: !!id,
  });
};

/**
 * Create a new menu category
 */
export const useCreateMenuCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      data,
    }: {
      restaurantId: number;
      data: Parameters<typeof menuCategoriesApi.create>[1];
    }) => menuCategoriesApi.create(restaurantId, data),
    onSuccess: (newCategory, { restaurantId }) => {
      // Invalidate categories list
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuCategoriesList(restaurantId),
      });
      // Cache the new category
      queryClient.setQueryData(queryKeys.menuCategoriesDetail(newCategory.id), newCategory);
    },
  });
};

/**
 * Update a menu category
 */
export const useUpdateMenuCategory = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<MenuCategory> }) =>
      menuCategoriesApi.update(id, data),
    onSuccess: (updatedCategory) => {
      // Update in cache
      queryClient.setQueryData(
        queryKeys.menuCategoriesDetail(updatedCategory.id),
        updatedCategory
      );
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuCategoriesList(restaurantId),
      });
    },
  });
};

/**
 * Delete a menu category
 */
export const useDeleteMenuCategory = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => menuCategoriesApi.delete(id),
    onSuccess: () => {
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.menuCategoriesList(restaurantId),
      });
    },
  });
};
