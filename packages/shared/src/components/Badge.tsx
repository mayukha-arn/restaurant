import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius } from '../tokens';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const badgeStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    minHeight: 20,
  },
  md: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    minHeight: 28,
  },
  // Variants
  default: {
    backgroundColor: colors.secondary,
  },
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  error: {
    backgroundColor: colors.error,
  },
  info: {
    backgroundColor: '#4169E1',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },
});

export const Badge = React.forwardRef<any, BadgeProps>(
  ({ label, variant = 'default', size = 'sm', style }, ref) => {
    const variantStyle =
      variant === 'success'
        ? badgeStyles.success
        : variant === 'warning'
          ? badgeStyles.warning
          : variant === 'error'
            ? badgeStyles.error
            : variant === 'info'
              ? badgeStyles.info
              : badgeStyles.default;

    const sizeStyle = size === 'md' ? badgeStyles.md : badgeStyles.sm;

    return (
      <View
        ref={ref}
        style={[badgeStyles.base, sizeStyle, variantStyle, style]}
      >
        <Text style={badgeStyles.text}>{label}</Text>
      </View>
    );
  }
);

Badge.displayName = 'Badge';
