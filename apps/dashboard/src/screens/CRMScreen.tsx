import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Skeleton } from '@shared/components';
import { useCustomersList, useRestaurantId } from '../hooks';

interface CRMScreenProps {
  onBack?: () => void;
}

export const CRMScreen = React.forwardRef<any, CRMScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const { data: customers, isLoading, error } = useCustomersList(restaurantId);

    const formatCurrency = (amount: any) => {
      const num = typeof amount === 'string' ? parseFloat(amount) : amount;
      return `$${num.toFixed(2)}`;
    };

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>👥 CRM</Text>
          <Text style={styles.subtitle}>Customer relationships ({customers?.length || 0})</Text>
        </View>

        {isLoading ? (
          <>
            <Skeleton style={styles.customerCard} />
            <Skeleton style={styles.customerCard} />
            <Skeleton style={styles.customerCard} />
          </>
        ) : error ? (
          <Text style={styles.errorText}>Failed to load customers</Text>
        ) : customers && customers.length > 0 ? (
          customers.map((customer) => (
            <Card key={customer.id} variant="elevated" style={styles.customerCard}>
              <Text style={styles.customerName}>
                {customer.firstName} {customer.lastName}
              </Text>
              {customer.email && (
                <Text style={styles.customerEmail}>{customer.email}</Text>
              )}
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Orders</Text>
                  <Text style={styles.statValue}>{customer.totalOrders}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Loyalty Pts</Text>
                  <Text style={styles.statValue}>{customer.loyaltyPoints}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Total Spend</Text>
                  <Text style={styles.statValue}>{formatCurrency(customer.totalSpent)}</Text>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No customers yet</Text>
          </View>
        )}
      </ScrollView>
    );
  }
);

CRMScreen.displayName = 'CRMScreen';

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
  customerCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  customerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing[1],
  },
  customerEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    marginBottom: spacing[3],
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    marginBottom: spacing[1],
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  errorText: {
    fontSize: typography.fontSize.base,
    color: colors.danger,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  emptyContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.secondary,
  },
});
