import React from 'react';
import '../styles/screens.css';

interface HomeScreenProps {
  onNavigate?: (section: string, category?: string) => void;
}

interface DishItem {
  id: string;
  emoji: string;
  label: string;
  labelColor: string;
  sublabel?: string;
  sublabelColor?: string;
  section: string;
  category: string;   // menu category to pre-select
  size: number;
  top: string;
  left: string;
  rotate?: string;
}

const DISHES: DishItem[] = [
  {
    id: 'burger',
    emoji: '🍔',
    label: 'BURGERS',
    labelColor: '#DC143C',
    section: 'menu',
    category: 'Burgers',
    size: 220,
    top: '28%',
    left: '8%',
  },
  {
    id: 'cola',
    emoji: '🥤',
    label: 'COLA',
    labelColor: '#4169E1',
    sublabel: 'HOMEMADE',
    sublabelColor: '#FF8C00',
    section: 'menu',
    category: 'Beverages',
    size: 150,
    top: '12%',
    left: '42%',
    rotate: '-6deg',
  },
  {
    id: 'fries',
    emoji: '🍟',
    label: 'FRIES',
    labelColor: '#DAA520',
    section: 'menu',
    category: 'Appetizers',
    size: 170,
    top: '50%',
    left: '40%',
  },
  {
    id: 'icecream',
    emoji: '🍨',
    label: 'ICE CREAM',
    labelColor: '#FF69B4',
    section: 'menu',
    category: 'Desserts',
    size: 210,
    top: '20%',
    left: '68%',
    rotate: '4deg',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="home-recs-bg">
      <h1 className="home-recs-heading">CHEF'S RECS:</h1>

      {DISHES.map((dish) => (
        <button
          key={dish.id}
          className="home-dish-btn"
          style={{
            top: dish.top,
            left: dish.left,
            transform: `rotate(${dish.rotate ?? '0deg'})`,
          }}
          onClick={() => onNavigate?.(dish.section, dish.category)}
        >
          {dish.sublabel && (
            <span className="home-dish-sublabel" style={{ color: dish.sublabelColor }}>
              {dish.sublabel}
            </span>
          )}
          <div
            className="home-dish-plate"
            style={{ width: dish.size, height: dish.size, fontSize: dish.size * 0.42 }}
          >
            {dish.emoji}
          </div>
          <span className="home-dish-label" style={{ color: dish.labelColor }}>
            {dish.label}
          </span>
        </button>
      ))}
    </div>
  );
};

HomeScreen.displayName = 'HomeScreen';
