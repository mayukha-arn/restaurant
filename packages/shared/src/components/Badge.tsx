import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ label, variant = 'default', size = 'sm', className = '' }, ref) => {
    const baseClass = 'badge';
    const variantClass = `badge-${variant}`;
    const sizeClass = `badge-${size}`;
    const fullClass = `${baseClass} ${sizeClass} ${variantClass} ${className}`.trim();

    return (
      <span ref={ref} className={fullClass}>
        {label}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
