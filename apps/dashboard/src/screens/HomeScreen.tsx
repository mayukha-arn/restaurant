import React, { useState } from 'react';
import { Card, Badge } from '@shared/components';
import '../styles/screens.css';

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
  section: string;
  description: string;
}

const foodItems: FoodItem[] = [
  {
    id: 'fries',
    name: 'Fries',
    emoji: '🍟',
    color: '#FFD700',
    section: 'orders',
    description: 'View Orders',
  },
  {
    id: 'burger',
    name: 'Burger',
    emoji: '🍔',
    color: '#D2691E',
    section: 'menu',
    description: 'Manage Menu',
  },
  {
    id: 'cola',
    name: 'Cola',
    emoji: '🥤',
    color: '#8B0000',
    section: 'settings',
    description: 'Settings',
  },
  {
    id: 'icecream',
    name: 'Ice Cream',
    emoji: '🍦',
    color: '#FFB6C1',
    section: 'crm',
    description: 'Customer CRM',
  },
];

// Checkered pattern background component (CSS-based for performance)
const CheckeredBackground = () => {
  return (
    <div
      className="home-checkered-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(45deg, #E8E8E8 25%, transparent 25%),
          linear-gradient(-45deg, #E8E8E8 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #E8E8E8 75%),
          linear-gradient(-45deg, transparent 75%, #E8E8E8 75%)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
        backgroundColor: '#FFFFFF',
      }}
    />
  );
};

interface HomeScreenProps {
  onNavigate?: (section: string) => void;
}

export const HomeScreen = React.forwardRef<HTMLDivElement, HomeScreenProps>(
  ({ onNavigate }, ref) => {
    const [selectedFood, setSelectedFood] = useState<string | null>(null);
    const [hoveredFood, setHoveredFood] = useState<string | null>(null);

    const handleFoodPress = (item: FoodItem) => {
      setSelectedFood(item.id);
      if (onNavigate) {
        onNavigate(item.section);
      }
    };

    return (
      <div
        ref={ref}
        className="home-screen overflow-y-auto"
      >
        {/* Checkered Table Background */}
        <div className="home-table-container">
          <CheckeredBackground />

          {/* Main Title - Vintage Diner Style */}
          <div className="home-header-overlay">
            <h1 className="home-title">🪩 DINER DASHBOARD 🪩</h1>
            <p className="home-subtitle">Select a food to navigate</p>
          </div>

          {/* Food Items Grid */}
          <div className="home-food-grid">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className={`home-food-item-wrapper ${
                  hoveredFood === item.id ? 'hovered' : ''
                } ${selectedFood === item.id ? 'selected' : ''}`}
                onClick={() => handleFoodPress(item)}
                onMouseEnter={() => setHoveredFood(item.id)}
                onMouseLeave={() => setHoveredFood(null)}
              >
                <Card
                  variant="elevated"
                  padding={false}
                  className="home-food-card"
                  style={{ borderColor: item.color, borderWidth: 3 }}
                >
                  <div
                    className="home-food-card-content"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="home-food-emoji">{item.emoji}</div>
                  </div>
                  <div className="home-food-card-info">
                    <h3 className="home-food-name">{item.name}</h3>
                    <Badge
                      label={item.description}
                      variant="default"
                      size="sm"
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Card */}
        <Card
          variant="filled"
          className="home-info-card"
        >
          <h2 className="home-info-title">Welcome to the Diner!</h2>
          <p className="home-info-text">
            Click on any food item above to navigate to different sections of
            the restaurant dashboard. This vintage 1950s themed interface brings
            a classic diner aesthetic to modern operations.
          </p>
          {selectedFood && (
            <p className="home-selected-text">
              Selected: {foodItems.find((f) => f.id === selectedFood)?.name}
            </p>
          )}
        </Card>
      </div>
    );
  }
);

HomeScreen.displayName = 'HomeScreen';
