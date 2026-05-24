import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Badge } from '@shared/components';

interface OrdersScreenProps {
  onBack?: () => void;
}

export const OrdersScreen = React.forwardRef<any, OrdersScreenProps>(
  ({ onBack }, ref) => {
    const mockOrders = [
      {
        id: '001',
        items: 'Burger, Fries, Cola',
        total: '$15.99',
        status: 'pending',
      },
      {
        id: '002',
        items: 'Pizza, Salad',
        total: '$18.50',
        status: 'preparing',
      },
      {
        id: '003',
        items: 'Ice Cream, Milkshake',
        total: '$9.99',
        status: 'ready',
      },
    ];

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📦 Orders</Text>
          <Text style={styles.subtitle}>Manage incoming orders</Text>
        </View>

        {mockOrders.map((order) => (
          <Card key={order.id} variant="elevated" style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Badge
                label={order.status.toUpperCase()}
                variant={
                  order.status === 'ready'
                    ? 'success'
                    : order.status === 'preparing'
                      ? 'warning'
                      : 'default'
                }
                size="sm"
              />
            </View>
            <Text style={styles.orderItems}>{order.items}</Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>{order.total}</Text>
            </View>
          </Card>
        ))}
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
    paddingTopWidth: 1,
    paddingTop: spacing[3],
    borderTopColor: colors.secondary,
  },
  orderTotal: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.success,
  },
});
