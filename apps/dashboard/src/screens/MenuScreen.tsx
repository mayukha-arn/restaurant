import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, spacing, typography } from '@shared/tokens';
import { Card, Badge, Skeleton } from '@shared/components';
import {
  useMenuCategoriesList,
  useMenuItemsListByCategory,
  useRestaurantId,
} from '../hooks';

interface MenuScreenProps {
  onBack?: () => void;
}

export const MenuScreen = React.forwardRef<any, MenuScreenProps>(
  ({ onBack }, ref) => {
    const restaurantId = useRestaurantId();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const {
      data: categories,
      isLoading: categoriesLoading,
      error: categoriesError,
    } = useMenuCategoriesList(restaurantId);

    const {
      data: items,
      isLoading: itemsLoading,
      error: itemsError,
    } = useMenuItemsListByCategory(selectedCategoryId);

    // Auto-select first category when loaded
    React.useEffect(() => {
      if (categories && categories.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(categories[0].id);
      }
    }, [categories, selectedCategoryId]);

    const formatPrice = (amount: any) => {
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
          <Text style={styles.title}>🍽️ Menu</Text>
          <Text style={styles.subtitle}>Browse menu items</Text>
        </View>

        {/* Category Tabs */}
        {categoriesLoading ? (
          <View style={styles.categoriesLoading}>
            <Skeleton style={styles.categoryTab} />
            <Skeleton style={styles.categoryTab} />
          </View>
        ) : categoriesError ? (
          <Text style={styles.errorText}>Failed to load categories</Text>
        ) : categories && categories.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryTab,
                  selectedCategoryId === category.id && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategoryId(category.id)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    selectedCategoryId === category.id && styles.categoryTabTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : null}

        {/* Menu Items */}
        {itemsLoading ? (
          <>
            <Skeleton style={styles.menuCard} />
            <Skeleton style={styles.menuCard} />
            <Skeleton style={styles.menuCard} />
          </>
        ) : itemsError ? (
          <Text style={styles.errorText}>Failed to load items</Text>
        ) : items && items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id} variant="elevated" style={styles.menuCard}>
              <View style={styles.menuHeader}>
                <View style={styles.menuInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  )}
                  <View style={styles.menuAttributes}>
                    {item.isVegetarian && (
                      <Badge label="🌱 Vegetarian" variant="info" size="sm" />
                    )}
                    {item.isSpicy && (
                      <Badge label="🌶️ Spicy" variant="warning" size="sm" />
                    )}
                  </View>
                </View>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              </View>
            </Card>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in this category</Text>
          </View>
        )}
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
  categoriesList: {
    marginBottom: spacing[4],
  },
  categoriesContent: {
    paddingHorizontal: spacing[4],
  },
  categoriesLoading: {
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  categoryTab: {
    marginRight: spacing[3],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: 6,
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryTabActive: {
    backgroundColor: colors.primary,
  },
  categoryTabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  categoryTabTextActive: {
    color: colors.white,
  },
  menuCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    padding: spacing[4],
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  menuInfo: {
    flex: 1,
    marginRight: spacing[4],
  },
  itemName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing[1],
  },
  itemDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.secondary,
    marginBottom: spacing[2],
  },
  menuAttributes: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  itemPrice: {
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
