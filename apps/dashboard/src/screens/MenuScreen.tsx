import React, { useState } from 'react';
import { Card, Badge, Skeleton } from '@shared/components';
import {
  useMenuCategoriesList,
  useMenuItemsListByCategory,
  useRestaurantId,
} from '../hooks';
import type { MenuCategory, MenuItem } from '@restaurant/types';
import '../styles/screens.css';

interface MenuScreenProps {
  onBack?: () => void;
}

export const MenuScreen = React.forwardRef<HTMLDivElement, MenuScreenProps>(
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
      <div
        ref={ref}
        className="menu-screen overflow-y-auto"
      >
        <div className="menu-header">
          <h1 className="menu-title">🍽️ Menu</h1>
          <p className="menu-subtitle">Browse menu items</p>
        </div>

        {/* Category Tabs */}
        {categoriesLoading ? (
          <div className="categories-loading">
            <Skeleton className="category-tab" />
            <Skeleton className="category-tab" />
          </div>
        ) : categoriesError ? (
          <p className="error-text">Failed to load categories</p>
        ) : categories && categories.length > 0 ? (
          <div className="categories-scroll">
            {categories.map((category: MenuCategory) => (
              <button
                key={category.id}
                className={`category-tab ${
                  selectedCategoryId === category.id ? 'active' : ''
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : null}

        {/* Menu Items */}
        <div className="menu-items-list">
          {itemsLoading ? (
            <>
              <Skeleton className="menu-card" />
              <Skeleton className="menu-card" />
              <Skeleton className="menu-card" />
            </>
          ) : itemsError ? (
            <p className="error-text">Failed to load items</p>
          ) : items && items.length > 0 ? (
            items.map((item: MenuItem) => (
              <Card key={item.id} variant="elevated" className="menu-card">
                <div className="menu-card-header">
                  <div className="menu-item-info">
                    <h3 className="menu-item-name">{item.name}</h3>
                    {item.description && (
                      <p className="menu-item-description">{item.description}</p>
                    )}
                    <div className="menu-attributes">
                      {item.isVegetarian && (
                        <Badge label="🌱 Vegetarian" variant="info" size="sm" />
                      )}
                      {item.isSpicy && (
                        <Badge label="🌶️ Spicy" variant="warning" size="sm" />
                      )}
                    </div>
                  </div>
                  <p className="menu-item-price">{formatPrice(item.price)}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="empty-state-container">
              <p className="empty-state-text">No items in this category</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MenuScreen.displayName = 'MenuScreen';
