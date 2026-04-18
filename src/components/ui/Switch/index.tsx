import { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D4D4D4', '#006414'],
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View
        style={{
          width: 48,
          height: 28,
          borderRadius: 20,
          backgroundColor,
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: 'white',
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;
