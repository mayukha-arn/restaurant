import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors, spacing, radius } from '../tokens';

interface SkeletonProps {
  width?: string | number;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  count?: number;
}

const skeletonStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.secondary,
    overflow: 'hidden',
  },
  container: {
    marginBottom: spacing[2],
  },
});

const shimmerAnimation = new Animated.Value(0);

Animated.loop(
  Animated.sequence([
    Animated.timing(shimmerAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }),
    Animated.timing(shimmerAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }),
  ])
).start();

export const Skeleton = React.forwardRef<any, SkeletonProps>(
  ({
    width = '100%',
    height = 16,
    borderRadius = radius.md,
    style,
    count = 1,
  },
  ref
  ) => {
    const skeletons = Array.from({ length: count });

    return (
      <View ref={ref}>
        {skeletons.map((_, i) => (
          <View
            key={i}
            style={[
              skeletonStyles.base,
              {
                width,
                height,
                borderRadius,
              },
              i < skeletons.length - 1 && skeletonStyles.container,
              style,
            ]}
          />
        ))}
      </View>
    );
  }
);

Skeleton.displayName = 'Skeleton';
