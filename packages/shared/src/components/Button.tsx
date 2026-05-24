import React from 'react';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      onPress,
      onClick,
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
    },
    ref
  ) => {
    const baseClass = 'button';
    const variantClass = `button-${variant}`;
    const sizeClass = `button-${size}`;
    const disabledClass = disabled ? 'disabled' : '';
    const fullClass = `${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

    const handleClick = onClick || onPress;

    return (
      <button
        ref={ref}
        className={fullClass}
        onClick={handleClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = 'Button';
