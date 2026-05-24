import React from 'react';
import { Card, Badge, Skeleton } from '@shared/components';
import { useOrdersList, useRestaurantId, useUpdateOrder } from '../hooks';
import type { Order, OrderItem } from '@restaurant/types';
import '../styles/screens.css';

interface OrdersScreenProps {
  onBack?: () => void;
}

export const OrdersScreen = React.forwardRef<HTMLDivElement, OrdersScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const { data: orders, isLoading, error, refetch } = useOrdersList(restaurantId);
    const updateOrderMutation = useUpdateOrder(restaurantId);

    // Format order items for display
    const formatOrderItems = (orderItems: OrderItem[] | undefined) => {
      if (!orderItems || orderItems.length === 0) return 'No items';
      return orderItems.map((item) => item.menuItem?.name || 'Unknown item').join(', ');
    };

    // Format price
    const formatPrice = (amount: any) => {
      const num = typeof amount === 'string' ? parseFloat(amount) : amount;
      return `$${num.toFixed(2)}`;
    };

    // Handle status update
    const handleStatusUpdate = async (orderId: number, currentStatus: string) => {
      const statusMap: Record<string, string> = {
        pending: 'confirmed',
        confirmed: 'in_progress',
        in_progress: 'ready',
        ready: 'completed',
        completed: 'pending',
      };
      const nextStatus = statusMap[currentStatus] || 'pending';

      updateOrderMutation.mutate({
        id: orderId,
        data: { status: nextStatus as any },
      });
    };

    if (error) {
      return (
        <div
          ref={ref}
          className="orders-screen overflow-y-auto"
        >
          <div className="error-state-container">
            <p className="error-message-text">⚠️ Error Loading Orders</p>
            <p className="error-message-text">
              {error instanceof Error ? error.message : 'Failed to load orders'}
            </p>
            <button
              className="retry-button"
              onClick={() => refetch()}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="orders-screen overflow-y-auto"
      >
        <div className="orders-header">
          <h1 className="orders-title">📦 Orders</h1>
          <p className="orders-subtitle">Manage incoming orders ({orders?.length || 0})</p>
        </div>

        <div className="orders-list">
          {isLoading ? (
            // Loading skeletons
            <>
              <Skeleton className="order-card" />
              <Skeleton className="order-card" />
              <Skeleton className="order-card" />
            </>
          ) : orders && orders.length > 0 ? (
            // Orders list
            orders.map((order: Order) => (
              <Card key={order.id} variant="elevated" className="order-card">
                <div className="order-header">
                  <h3 className="order-number">Order #{order.orderNumber}</h3>
                  <Badge
                    label={order.status.toUpperCase()}
                    variant={
                      order.status === 'ready'
                        ? 'success'
                        : order.status === 'completed'
                          ? 'success'
                          : order.status === 'in_progress'
                            ? 'warning'
                            : 'default'
                    }
                    size="sm"
                  />
                </div>
                <p className="order-items">
                  {formatOrderItems(order.orderItems)}
                </p>
                <div className="order-footer">
                  <p className="order-total">{formatPrice(order.totalAmount)}</p>
                  <button
                    className={`order-action-btn ${
                      updateOrderMutation.isLoading ? 'disabled' : ''
                    }`}
                    onClick={() => handleStatusUpdate(order.id, order.status)}
                    disabled={updateOrderMutation.isLoading}
                  >
                    {updateOrderMutation.isLoading ? (
                      <span className="spinner spinner-sm" />
                    ) : (
                      'Next Status'
                    )}
                  </button>
                </div>
              </Card>
            ))
          ) : (
            // Empty state
            <div className="empty-state-container">
              <p className="empty-state-title">No Orders Yet</p>
              <p className="empty-state-text">Orders will appear here when customers place them</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

OrdersScreen.displayName = 'OrdersScreen';
