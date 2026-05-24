import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Badge, Skeleton } from '@shared/components';
import { useOrdersList, useRestaurantId, useUpdateOrder } from '../hooks';

interface OrdersScreenProps {
  onBack?: () => void;
}

export const OrdersScreen = React.forwardRef<any, OrdersScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const { data: orders, isLoading, error, refetch } = useOrdersList(restaurantId);
    const updateOrderMutation = useUpdateOrder(restaurantId);

    // Format order items for display
    const formatOrderItems = (orderItems: any[]) => {
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
        <ScrollView
          ref={ref}
          style={styles.container}
          contentContainerStyle={styles.content}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Error Loading Orders</Text>
            <Text style={styles.errorMessage}>
              {error instanceof Error ? error.message : 'Failed to load orders'}
            </Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => refetch()}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📦 Orders</Text>
          <Text style={styles.subtitle}>Manage incoming orders ({orders?.length || 0})</Text>
        </View>

        {isLoading ? (
          // Loading skeletons
          <>
            <Skeleton style={styles.orderCard} />
            <Skeleton style={styles.orderCard} />
            <Skeleton style={styles.orderCard} />
          </>
        ) : orders && orders.length > 0 ? (
          // Orders list
          orders.map((order) => (
            <Card key={order.id} variant="elevated" style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.orderNumber}</Text>
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
              </View>
              <Text style={styles.orderItems}>
                {formatOrderItems(order.orderItems)}
              </Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>{formatPrice(order.totalAmount)}</Text>
                <Pressable
                  style={[
                    styles.statusButton,
                    updateOrderMutation.isPending && styles.statusButtonDisabled,
                  ]}
                  onPress={() => handleStatusUpdate(order.id, order.status)}
                  disabled={updateOrderMutation.isPending}
                >
                  {updateOrderMutation.isPending ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Text style={styles.statusButtonText}>Next Status</Text>
                  )}
                </Pressable>
              </View>
            </Card>
          ))
        ) : (
          // Empty state
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyMessage}>Orders will appear here when customers place them</Text>
          </View>
        )}
      </ScrollView>
    );
  }
);

OrdersScreen.displayName = 'OrdersScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingVertical: spacing[4],
  },
  header: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing[4],
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
  },
  orderCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  orderId: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
  },
  orderItems: {
    fontSize: typography.fontSize.base,
    color: colors.dark,
    marginBottom: spacing[3],
    lineHeight: 20,
  },
  orderFooter: {
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.success,
  },
  statusButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 6,
  },
  statusButtonDisabled: {
    opacity: 0.6,
  },
  statusButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: typography.fontSize.sm,
  },
  errorContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.danger,
    marginBottom: spacing[2],
  },
  errorMessage: {
    fontSize: typography.fontSize.base,
    color: colors.secondary,
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 6,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: spacing[2],
  },
  emptyMessage: {
    fontSize: typography.fontSize.base,
    color: colors.secondary,
    textAlign: 'center',
  },
});
