/**
 * Restaurants Hooks
 *
 * React Query hooks for restaurants API endpoints
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantsApi } from '../services/api.client';
import { queryKeys } from '../queryKeys';
import type { Restaurant } from '@types';

/**
 * Get all restaurants
 */
export const useRestaurantsList = () => {
  return useQuery({
    queryKey: queryKeys.restaurantsList(),
    queryFn: () => restaurantsApi.list(),
  });
};

/**
 * Get a single restaurant
 */
export const useRestaurant = (id: number | null) => {
  return useQuery({
    queryKey: id ? queryKeys.restaurantsDetail(id) : ['restaurants-disabled'],
    queryFn: id ? () => restaurantsApi.getById(id) : () => Promise.reject('No ID'),
    enabled: !!id,
  });
};

/**
 * Update a restaurant
 */
export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Restaurant> }) =>
      restaurantsApi.update(id, data),
    onSuccess: (updatedRestaurant) => {
      // Update in cache
      queryClient.setQueryData(
        queryKeys.restaurantsDetail(updatedRestaurant.id),
        updatedRestaurant
      );
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.restaurantsList(),
      });
    },
  });
};
