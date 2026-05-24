import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { colors, spacing, radius, typography } from '@shared/tokens';
import { Card, Badge } from '@shared/components';

const { width } = Dimensions.get('window');

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

// Checkered pattern background component
const CheckeredBackground = () => {
  const checkerSize = 40;
  const rows = Math.ceil(height / checkerSize);
  const cols = Math.ceil(width / checkerSize);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
        },
      ]}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={{
            flexDirection: 'row',
            height: checkerSize,
            backgroundColor:
              rowIndex % 2 === 0 ? '#FFFFFF' : '#E8E8E8',
          }}
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <View
              key={`col-${colIndex}`}
              style={{
                width: checkerSize,
                height: checkerSize,
                backgroundColor:
                  (rowIndex + colIndex) % 2 === 0
                    ? '#FFFFFF'
                    : '#E8E8E8',
                borderWidth: 1,
                borderColor: '#D3D3D3',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

interface HomeScreenProps {
  onNavigate?: (section: string) => void;
}

const { height } = Dimensions.get('window');

export const HomeScreen = React.forwardRef<any, HomeScreenProps>(
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
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Checkered Table Background */}
        <View style={styles.tableContainer}>
          <CheckeredBackground />

          {/* Main Title - Vintage Diner Style */}
          <View style={styles.headerOverlay}>
            <Text style={styles.title}>🪩 DINER DASHBOARD 🪩</Text>
            <Text style={styles.subtitle}>
              Select a food to navigate
            </Text>
          </View>

          {/* Food Items Grid */}
          <View style={styles.foodGrid}>
            {foodItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleFoodPress(item)}
                onHoverIn={() => setHoveredFood(item.id)}
                onHoverOut={() => setHoveredFood(null)}
                style={[
                  styles.foodItemWrapper,
                  hoveredFood === item.id && styles.foodItemHovered,
                  selectedFood === item.id && styles.foodItemSelected,
                ]}
              >
                <Card
                  variant="elevated"
                  padding={false}
                  style={[
                    styles.foodCard,
                    { borderColor: item.color, borderWidth: 3 },
                  ]}
                >
                  <View
                    style={[
                      styles.foodCardContent,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <Text style={styles.foodEmoji}>{item.emoji}</Text>
                  </View>
                  <View style={styles.foodCardInfo}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Badge
                      label={item.description}
                      variant="default"
                      size="sm"
                    />
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bottom Info Card */}
        <Card
          variant="filled"
          style={styles.infoCard}
        >
          <Text style={styles.infoTitle}>Welcome to the Diner!</Text>
          <Text style={styles.infoText}>
            Click on any food item above to navigate to different sections of
            the restaurant dashboard. This vintage 1950s themed interface brings
            a classic diner aesthetic to modern operations.
          </Text>
          {selectedFood && (
            <Text style={styles.selectedText}>
              Selected: {foodItems.find((f) => f.id === selectedFood)?.name}
            </Text>
          )}
        </Card>
      </ScrollView>
    );
  }
);

HomeScreen.displayName = 'HomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: spacing[6],
  },
  tableContainer: {
    height: 500,
    position: 'relative',
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    fontFamily: typography.fontFamily.diner,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  foodGrid: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  foodItemWrapper: {
    margin: spacing[3],
    width: width * 0.35,
    maxWidth: 150,
  },
  foodItemHovered: {
    transform: [{ scale: 1.05 }],
  },
  foodItemSelected: {
    opacity: 1,
  },
  foodCard: {
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  foodCardContent: {
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodEmoji: {
    fontSize: 64,
    lineHeight: 72,
  },
  foodCardInfo: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    backgroundColor: colors.light,
  },
  foodName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing[2],
    fontFamily: typography.fontFamily.diner,
  },
  infoCard: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  infoTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing[3],
    fontFamily: typography.fontFamily.diner,
  },
  infoText: {
    fontSize: typography.fontSize.base,
    color: colors.dark,
    lineHeight: 24,
    marginBottom: spacing[3],
  },
  selectedText: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontWeight: '600',
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
});
