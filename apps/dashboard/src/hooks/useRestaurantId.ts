/**
 * useRestaurantId Hook
 *
 * Returns the current restaurant ID for API calls.
 *
 * In a production app, this would:
 * - Get the restaurant ID from auth context
 * - Get it from URL parameters
 * - Get it from Redux/Zustand store
 *
 * For MVP, we hardcode to 1 (matches seed data in database)
 */

export const useRestaurantId = (): number => {
  // TODO: In production, get from context, auth, or URL params
  // For now, hardcode to 1 - matches seed data created by seed.ts
  return 1;
};

/**
 * Example implementation if using context in future:
 *
 * import { useContext } from 'react';
 * import { RestaurantContext } from '../context/RestaurantContext';
 *
 * export const useRestaurantId = (): number => {
 *   const { restaurantId } = useContext(RestaurantContext);
 *   if (!restaurantId) {
 *     throw new Error('RestaurantId not found in context');
 *   }
 *   return restaurantId;
 * };
 */
