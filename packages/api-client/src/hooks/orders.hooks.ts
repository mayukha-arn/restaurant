/**
 * Orders Hooks
 *
 * React Query hooks for orders API endpoints
 * Handles caching, loading states, and mutations automatically
 */

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ordersApi } from '../services/api.client';
import { queryKeys } from '../queryKeys';
import type { Order } from '@restaurant/types';

/**
 * Get all orders for a restaurant
 */
export const useOrdersList = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.ordersList(restaurantId),
    queryFn: () => ordersApi.list(restaurantId),
  });
};

/**
 * Get a single order by ID
 */
export const useOrder = (id: number | null) => {
  return useQuery({
    queryKey: id ? queryKeys.ordersDetail(id) : ['orders-disabled'],
    queryFn: id ? () => ordersApi.getById(id) : () => Promise.reject('No ID provided'),
    enabled: !!id, // Only run query if ID is provided
  });
};

/**
 * Create a new order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      data,
    }: {
      restaurantId: number;
      data: Parameters<typeof ordersApi.create>[1];
    }) => ordersApi.create(restaurantId, data),
    onSuccess: (newOrder, { restaurantId }) => {
      // Invalidate orders list to trigger refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.ordersList(restaurantId),
      });
      // Add new order to cache
      queryClient.setQueryData(queryKeys.ordersDetail(newOrder.id), newOrder);
    },
  });
};

/**
 * Update an order (status, payment, etc.)
 */
export const useUpdateOrder = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof ordersApi.update>[1] }) =>
      ordersApi.update(id, data),
    onSuccess: (updatedOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(queryKeys.ordersDetail(updatedOrder.id), updatedOrder);
      // Invalidate orders list to trigger refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.ordersList(restaurantId),
      });
    },
  });
};

/**
 * Look up an order by order number
 */
export const useOrderLookup = (orderNumber: string | null) => {
  return useQuery({
    queryKey: orderNumber ? queryKeys.ordersLookup(orderNumber) : ['orders-lookup-disabled'],
    queryFn: orderNumber ? () => ordersApi.lookup(orderNumber) : () => Promise.reject('No order number'),
    enabled: !!orderNumber,
  });
};
