/**
 * Customers Hooks
 *
 * React Query hooks for customers API endpoints
 */

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { customersApi } from '../services/api.client';
import { queryKeys } from '../queryKeys';
import type { Customer } from '@restaurant/types';

/**
 * Get all customers for a restaurant
 */
export const useCustomersList = (restaurantId: number) => {
  return useQuery({
    queryKey: queryKeys.customersList(restaurantId),
    queryFn: () => customersApi.list(restaurantId),
  });
};

/**
 * Get a single customer
 */
export const useCustomer = (id: number | null) => {
  return useQuery({
    queryKey: id ? queryKeys.customersDetail(id) : ['customers-disabled'],
    queryFn: id ? () => customersApi.getById(id) : () => Promise.reject('No ID'),
    enabled: !!id,
  });
};

/**
 * Create a new customer
 */
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      data,
    }: {
      restaurantId: number;
      data: Parameters<typeof customersApi.create>[1];
    }) => customersApi.create(restaurantId, data),
    onSuccess: (newCustomer, { restaurantId }) => {
      // Invalidate customers list
      queryClient.invalidateQueries({
        queryKey: queryKeys.customersList(restaurantId),
      });
      // Cache the new customer
      queryClient.setQueryData(queryKeys.customersDetail(newCustomer.id), newCustomer);
    },
  });
};

/**
 * Update a customer
 */
export const useUpdateCustomer = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Customer> }) =>
      customersApi.update(id, data),
    onSuccess: (updatedCustomer) => {
      // Update in cache
      queryClient.setQueryData(queryKeys.customersDetail(updatedCustomer.id), updatedCustomer);
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.customersList(restaurantId),
      });
    },
  });
};

/**
 * Delete a customer
 */
export const useDeleteCustomer = (restaurantId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => customersApi.delete(id),
    onSuccess: () => {
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: queryKeys.customersList(restaurantId),
      });
    },
  });
};
