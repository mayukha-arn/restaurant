/**
 * Vintage Americana Diner Design System
 * High-contrast, low-fi, stop-motion cartoon aesthetic
 */

export const diverColors = {
  // Primary Palette
  cream: '#FDFBF7',      // Retro off-white menu background
  ketchup: '#D32F2F',    // Classic deep diner red
  mustard: '#FBC02D',    // Rich burger/fries yellow
  charcoal: '#212121',   // Soft retro black for structural outlines

  // Secondary (for status/variants)
  mint: '#4CAF50',       // Vintage mint green (success)
  navy: '#1A237E',       // Deep navy (secondary action)
  pink: '#FF6B9D',       // Retro pink (accent)
  orange: '#FF9800',     // Vintage orange (warning)
};

export const diverBorders = {
  thick: '3px solid #212121',  // Comic-book style stroke
  medium: '2px solid #212121',
  thin: '1px solid #212121',
};

export const diverShadows = {
  block: '4px 4px 0px 0px #212121',      // Hard, un-blurred block drop shadow
  blockSmall: '1px 1px 0px 0px #212121', // Pressed state
  blockMed: '2px 2px 0px 0px #212121',
};

export const diverTypography = {
  fontFamily: {
    primary: 'Courier, monospace',      // Typewriter aesthetic
    display: 'Impact, Arial Black, sans-serif', // Bold diner signage
  },
  fontSize: {
    button: '20px',
    label: '14px',
    small: '12px',
  },
  fontWeight: {
    bold: 900,
    semibold: 700,
  },
  letterSpacing: {
    wide: '0.15em',  // Uppercase tracking for retro feel
  },
};

export const diverSpacing = {
  buttonPadding: '16px 32px',  // py-4 px-8
  buttonSmall: '8px 16px',
  buttonLarge: '20px 40px',
};

export const diverRadii = {
  button: '12px',  // Rounded corner enamel badge feel
  small: '4px',
};

/**
 * Animation easing: Step functions for choppy cartoon motion
 * Reject smooth bezier curves; embrace frame-by-frame stop-motion
 */
export const diverAnimations = {
  steppedHover: 'all 0.075s steps(2)',  // Choppy 2-frame hover wobble
  steppedActive: 'all 0.1s steps(1)',   // Instant mechanical press
  loadingShimmer: 'tablecloth 0.3s steps(2) infinite',
};

/**
 * State offsets for mechanical click effect
 */
export const diverStateOffsets = {
  hoverRotate: '1deg',         // Subtle tilt on hover
  hoverTranslateY: '-1px',     // Micro-lift up
  activeTranslateX: '3px',     // Mechanical press down-right
  activeTranslateY: '3px',
};
