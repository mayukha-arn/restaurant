import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, radius, shadows } from '../tokens';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    minHeight: 32,
  },
  md: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    minHeight: 40,
  },
  lg: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    minHeight: 48,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
});

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      label,
      onPress,
      variant = 'primary',
      size = 'md',
      disabled = false,
      style,
      textStyle,
    },
    ref
  ) => {
    const variantStyle =
      variant === 'primary'
        ? buttonStyles.primary
        : variant === 'secondary'
          ? buttonStyles.secondary
          : variant === 'outline'
            ? buttonStyles.outline
            : variant === 'ghost'
              ? buttonStyles.ghost
              : buttonStyles.primary;

    const sizeStyle =
      size === 'sm'
        ? buttonStyles.sm
        : size === 'lg'
          ? buttonStyles.lg
          : buttonStyles.md;

    const textColor =
      variant === 'outline'
        ? buttonStyles.outlineText
        : variant === 'ghost'
          ? buttonStyles.ghostText
          : { color: colors.white };

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={[
          buttonStyles.base,
          sizeStyle,
          variantStyle,
          disabled && buttonStyles.disabled,
          style,
        ]}
      >
        <Text style={[buttonStyles.text, textColor, textStyle]}>{label}</Text>
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
