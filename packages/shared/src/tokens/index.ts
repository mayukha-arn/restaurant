// Design tokens - Vintage Americana diner theme
export { diverTheme } from './diner-theme';

// Re-export for convenience
export const colors = {
  primary: '#DC143C',      // Crimson red
  secondary: '#C0C0C0',    // Chrome silver
  accent: '#FFD700',       // Gold
  dark: '#1a1a1a',         // Deep black
  light: '#FFFACD',        // Lemon chiffon
  white: '#FFFFFF',
  success: '#228B22',      // Forest green
  warning: '#FF8C00',      // Dark orange
  error: '#DC143C',        // Crimson
  disabled: '#A9A9A9',     // Dark gray
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontFamily: {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif',
    mono: 'Courier New, monospace',
    diner: 'Courier, serif',
  },
};

export const spacing = {
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
};

export const radius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  base: '0 1px 3px 0 rgba(0,0,0,0.1)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1)',
};

export const elevation = {
  raised: '0 2px 8px rgba(0,0,0,0.12)',
  floating: '0 8px 16px rgba(0,0,0,0.15)',
  modal: '0 20px 40px rgba(0,0,0,0.3)',
};
