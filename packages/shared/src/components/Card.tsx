import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius, shadows } from '../tokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'filled';
  padding?: boolean;
}

const cardStyles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  elevated: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  filled: {
    backgroundColor: colors.light,
  },
  padding: {
    padding: spacing[4],
  },
});

export const Card = React.forwardRef<any, CardProps>(
  ({ children, style, variant = 'default', padding = true }, ref) => {
    const variantStyle =
      variant === 'elevated'
        ? cardStyles.elevated
        : variant === 'filled'
          ? cardStyles.filled
          : cardStyles.default;

    return (
      <View
        ref={ref}
        style={[
          cardStyles.base,
          variantStyle,
          padding && cardStyles.padding,
          style,
        ]}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
