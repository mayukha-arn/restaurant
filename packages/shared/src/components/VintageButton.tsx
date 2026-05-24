import React from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  diverColors,
  diverBorders,
  diverShadows,
  diverTypography,
  diverSpacing,
  diverRadii,
} from '../tokens/vintage-diner';

interface VintageButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'accent' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: parseInt(diverRadii.button),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: diverColors.charcoal,
  },

  /* SIZE VARIANTS */
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 32,
  },
  md: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 48,
  },
  lg: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    minHeight: 56,
  },

  /* COLOR VARIANTS */
  primary: {
    backgroundColor: diverColors.ketchup,
  },
  primaryHover: {
    backgroundColor: '#E53935',
  },
  primaryActive: {
    backgroundColor: diverColors.ketchup,
  },

  accent: {
    backgroundColor: diverColors.mustard,
  },
  accentHover: {
    backgroundColor: '#FDD835',
  },
  accentActive: {
    backgroundColor: diverColors.mustard,
  },

  secondary: {
    backgroundColor: diverColors.navy,
  },
  secondaryHover: {
    backgroundColor: '#283593',
  },
  secondaryActive: {
    backgroundColor: diverColors.navy,
  },

  /* TEXT STYLING */
  textPrimary: {
    fontSize: parseInt(diverTypography.fontSize.button),
    fontWeight: diverTypography.fontWeight.bold.toString() as any,
    color: diverColors.cream,
    fontFamily: diverTypography.fontFamily.display,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  textAccent: {
    fontSize: parseInt(diverTypography.fontSize.button),
    fontWeight: diverTypography.fontWeight.bold.toString() as any,
    color: diverColors.charcoal,
    fontFamily: diverTypography.fontFamily.display,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  textSecondary: {
    fontSize: parseInt(diverTypography.fontSize.button),
    fontWeight: diverTypography.fontWeight.bold.toString() as any,
    color: diverColors.cream,
    fontFamily: diverTypography.fontFamily.display,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  disabled: {
    opacity: 0.5,
  },

  /* SHADOW STATES */
  shadowResting: {
    shadowColor: diverColors.charcoal,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },

  shadowPressed: {
    shadowColor: diverColors.charcoal,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
});

export const VintageButton = React.forwardRef<any, VintageButtonProps>(
  (
    {
      label,
      onPress,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      style,
      textStyle,
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    // Determine color variant
    const getColorVariant = () => {
      switch (variant) {
        case 'accent':
          return isPressed
            ? buttonStyles.accentActive
            : isHovered
              ? buttonStyles.accentHover
              : buttonStyles.accent;
        case 'secondary':
          return isPressed
            ? buttonStyles.secondaryActive
            : isHovered
              ? buttonStyles.secondaryHover
              : buttonStyles.secondary;
        case 'primary':
        default:
          return isPressed
            ? buttonStyles.primaryActive
            : isHovered
              ? buttonStyles.primaryHover
              : buttonStyles.primary;
      }
    };

    // Determine text color
    const getTextColor = () => {
      switch (variant) {
        case 'accent':
          return buttonStyles.textAccent;
        case 'secondary':
          return buttonStyles.textSecondary;
        case 'primary':
        default:
          return buttonStyles.textPrimary;
      }
    };

    // Determine size
    const getSizeStyle = () => {
      switch (size) {
        case 'sm':
          return buttonStyles.sm;
        case 'lg':
          return buttonStyles.lg;
        case 'md':
        default:
          return buttonStyles.md;
      }
    };

    // Determine shadow
    const getShadowStyle = () => {
      return isPressed ? buttonStyles.shadowPressed : buttonStyles.shadowResting;
    };

    // Mechanical press offset
    const pressOffset = isPressed ? { marginTop: 3, marginLeft: 3 } : {};

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        disabled={disabled || loading}
        style={[
          buttonStyles.base,
          getSizeStyle(),
          getColorVariant(),
          getShadowStyle(),
          disabled && buttonStyles.disabled,
          pressOffset,
          style,
        ]}
      >
        <Text style={[getTextColor(), textStyle]}>
          {loading ? '⏳ LOADING...' : label}
        </Text>
      </Pressable>
    );
  }
);

VintageButton.displayName = 'VintageButton';
