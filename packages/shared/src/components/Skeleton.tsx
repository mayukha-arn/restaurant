import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: number;
  borderRadius?: number;
  className?: string;
  count?: number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    width = '100%',
    height = 16,
    borderRadius = 8,
    className = '',
    count = 1,
  },
  ref
  ) => {
    const skeletons = Array.from({ length: count });

    return (
      <div ref={ref}>
        {skeletons.map((_, i) => (
          <div
            key={i}
            className={`skeleton ${className}`.trim()}
            style={{
              width: typeof width === 'number' ? `${width}px` : width,
              height: `${height}px`,
              borderRadius: `${borderRadius}px`,
              marginBottom: i < skeletons.length - 1 ? '8px' : 0,
            }}
          />
        ))}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
