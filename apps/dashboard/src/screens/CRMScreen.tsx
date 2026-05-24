import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card } from '@shared/components';

interface CRMScreenProps {
  onBack?: () => void;
}

export const CRMScreen = React.forwardRef<any, CRMScreenProps>(
  ({ onBack }, ref) => {
    const mockCustomers = [
      { id: '1', name: 'John Doe', orders: 5, spend: '$78.50' },
      { id: '2', name: 'Jane Smith', orders: 3, spend: '$45.99' },
      { id: '3', name: 'Bob Johnson', orders: 12, spend: '$189.99' },
    ];

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>👥 CRM</Text>
          <Text style={styles.subtitle}>Customer relationships</Text>
        </View>

        {mockCustomers.map((customer) => (
          <Card key={customer.id} variant="elevated" style={styles.customerCard}>
            <Text style={styles.customerName}>{customer.name}</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Orders</Text>
                <Text style={styles.statValue}>{customer.orders}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Total Spend</Text>
                <Text style={styles.statValue}>{customer.spend}</Text>
              </View>
            </View>
          </Card>
        ))}
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
});
