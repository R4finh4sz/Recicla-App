import { useMemo } from 'react';
import { Animated, View } from 'react-native';

type CustomScrollIndicatorProps = {
  canScroll: boolean;
  dimensions: { container: number; content: number };
  scrollY: Animated.Value;
  scrollRange: number;
  trackWidth?: number;
  thumbMinHeight?: number;
  thumbMaxHeight?: number;
};

export const CustomScrollIndicator = ({
  canScroll,
  dimensions,
  scrollY,
  scrollRange,
  trackWidth = 4,
  thumbMinHeight = 28,
  thumbMaxHeight,
}: CustomScrollIndicatorProps) => {
  const { thumbHeight, thumbY } = useMemo(() => {
    if (!canScroll) {
      return { thumbHeight: trackWidth, thumbY: scrollY };
    }

    const visibleRatio = dimensions.container / dimensions.content;
    const calculatedHeight = visibleRatio * dimensions.container;

    let height = Math.max(calculatedHeight, thumbMinHeight);

    if (thumbMaxHeight) {
      height = Math.min(height, thumbMaxHeight);
    }

    const finalHeight = Math.min(height, dimensions.container);
    const maxTravel = Math.max(dimensions.container - finalHeight, 0);

    const thumbYInterpolated = scrollY.interpolate({
      inputRange: [0, scrollRange],
      outputRange: [0, maxTravel],
      extrapolate: 'clamp',
    });

    return { thumbHeight: finalHeight, thumbY: thumbYInterpolated };
  }, [
    canScroll,
    dimensions,
    scrollRange,
    thumbMinHeight,
    thumbMaxHeight,
    trackWidth,
    scrollY,
  ]);

  if (!canScroll) {
    return null;
  }

  return (
    <View
      className="h-full justify-center"
      pointerEvents="none"
      style={{ width: trackWidth }}
    >
      <View
        className="h-full rounded-full bg-tertiary-20"
        style={{ width: trackWidth }}
      />

      <Animated.View
        className="absolute left-0 top-0 rounded-full bg-tertiary-100"
        style={{
          width: trackWidth,
          height: thumbHeight,
          transform: [{ translateY: thumbY }],
        }}
      />
    </View>
  );
};

export default CustomScrollIndicator;
