/**
 * Vintage Americana Diner Theme
 * Classic 1950s diner aesthetic with chrome, reds, and pastels
 */

export const diverTheme = {
  // Primary colors - Classic diner palette
  colors: {
    // Reds and crimsons
    red: {
      50: '#FDE9E9',
      100: '#FBC4C4',
      500: '#DC143C',  // Crimson (primary)
      700: '#A01028',
      900: '#5C0915',
    },
    // Chrome silver
    silver: {
      50: '#F8F8F8',
      100: '#E8E8E8',
      300: '#D3D3D3',
      500: '#C0C0C0',  // Chrome silver
      700: '#808080',
      900: '#404040',
    },
    // Gold accents
    gold: {
      50: '#FFFEF0',
      100: '#FFFAE0',
      300: '#FFEF80',
      500: '#FFD700',  // Gold
      700: '#DAA520',
      900: '#B8860B',
    },
    // Pastels
    cream: '#FFFACD',  // Lemon chiffon
    mint: '#E0F8F7',   // Mint green
    peach: '#FFDAB9',  // Peach
    pink: '#FFB6C1',   // Light pink

    // Functional
    white: '#FFFFFF',
    black: '#1a1a1a',
    success: '#228B22',    // Forest green
    warning: '#FF8C00',    // Dark orange
    error: '#DC143C',      // Crimson red
    disabled: '#A9A9A9',   // Dark gray
  },

  // Typography
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontFamily: {
      sans: 'system-ui, -apple-system, Segoe UI, sans-serif',
      serif: 'Georgia, serif',
      mono: 'Courier New, monospace',
      diner: 'Courier, serif', // Classic diner style
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Spacing scale
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },

  // Border radius
  radius: {
    none: 0,
    sm: 2,
    base: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Border styles
  border: {
    width: {
      hairline: 1,
      thin: 2,
      base: 3,
      thick: 4,
    },
    style: {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted',
    },
  },

  // Shadows - Vintage diner style
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    base: '0 1px 3px 0 rgba(0,0,0,0.1)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.15)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.2)',
    chrome: '0 4px 6px rgba(192, 192, 192, 0.4)',
  },

  // Elevation system
  elevation: {
    raised: {
      shadowColor: 'rgba(0,0,0,0.12)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
    },
    floating: {
      shadowColor: 'rgba(0,0,0,0.15)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
    },
    modal: {
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 1,
      shadowRadius: 40,
      elevation: 20,
    },
  },

  // Semantic color roles
  semantic: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F8F8',
      tertiary: '#E8E8E8',
    },
    surface: {
      default: '#FFFFFF',
      elevated: '#F8F8F8',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      tertiary: '#999999',
      inverse: '#FFFFFF',
    },
    border: {
      default: '#E0E0E0',
      subtle: '#F0F0F0',
      strong: '#999999',
    },
    feedback: {
      success: '#228B22',
      warning: '#FF8C00',
      error: '#DC143C',
      info: '#4169E1',
    },
  },
};

export type DiverThemeType = typeof diverTheme;
