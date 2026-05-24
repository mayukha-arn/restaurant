import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'elevated' | 'filled';
  padding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', style, variant = 'default', padding = true }, ref) => {
    const baseClass = 'card';
    const variantClass = `card-${variant}`;
    const paddingClass = padding ? 'card-padding' : '';
    const fullClass = `${baseClass} ${variantClass} ${paddingClass} ${className}`.trim();

    return (
      <div ref={ref} className={fullClass} style={style}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
