import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Badge } from '@shared/components';

interface MenuScreenProps {
  onBack?: () => void;
}

export const MenuScreen = React.forwardRef<any, MenuScreenProps>(
  ({ onBack }, ref) => {
    const mockMenuItems = [
      { id: '1', name: 'Classic Burger', price: '$12.99', category: 'Mains' },
      { id: '2', name: 'Crispy Fries', price: '$4.99', category: 'Sides' },
      { id: '3', name: 'Milkshake', price: '$5.99', category: 'Drinks' },
      { id: '4', name: 'Ice Cream Sundae', price: '$7.99', category: 'Desserts' },
    ];

    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🍽️ Menu</Text>
          <Text style={styles.subtitle}>Manage menu items</Text>
        </View>

        {mockMenuItems.map((item) => (
          <Card key={item.id} variant="elevated" style={styles.menuCard}>
            <View style={styles.menuHeader}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Badge label={item.category} variant="info" size="sm" />
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  }
);

MenuScreen.displayName = 'MenuScreen';

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
  menuCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing[2],
  },
  itemPrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
