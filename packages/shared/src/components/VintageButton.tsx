import React from 'react';

interface VintageButtonProps {
  label: string;
  onPress?: () => void;
  onClick?: () => void;
  variant?: 'primary' | 'accent' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const VintageButton = React.forwardRef<HTMLButtonElement, VintageButtonProps>(
  (
    {
      label,
      onPress,
      onClick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className = '',
      style,
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const baseClass = 'vintage-button';
    const variantClass = `vintage-button-${variant}`;
    const sizeClass = `vintage-button-${size}`;
    const disabledClass = disabled || loading ? 'disabled' : '';
    const pressedClass = isPressed ? 'pressed' : '';

    const fullClass = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${pressedClass} ${className}`.trim();

    const handleClick = onClick || onPress;

    return (
      <button
        ref={ref}
        className={fullClass}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled || loading}
        style={style}
      >
        {loading ? '⏳ LOADING...' : label}
      </button>
    );
  }
);

VintageButton.displayName = 'VintageButton';
