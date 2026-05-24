/**
 * Query Provider
 *
 * Sets up React Query with optimal configuration for the restaurant dashboard.
 * Wraps the entire app to provide caching, synchronization, and background refetch.
 */

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Create a configured QueryClient instance
 *
 * Configuration:
 * - staleTime: 5 minutes (data stays fresh for 5 min)
 * - cacheTime: 10 minutes (unused queries cached for 10 min)
 * - retry: 3 attempts on network errors
 * - refetchOnWindowFocus: true (refetch when user returns to tab)
 */
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Unused queries are garbage collected after 10 minutes
        gcTime: 1000 * 60 * 10,
        // Retry failed requests up to 3 times
        retry: 3,
        // Automatically refetch when window regains focus
        refetchOnWindowFocus: true,
        // Don't refetch on mount if data is fresh
        refetchOnMount: false,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
      },
    },
  });
};

// Create singleton instance
const queryClient = createQueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider Component
 *
 * Wraps the app with QueryClientProvider to enable React Query functionality.
 * Place this at the root of your app, above all components that use queries.
 */
export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

/**
 * Export the queryClient for direct access if needed
 * (e.g., for manual cache invalidation)
 */
export { queryClient };
