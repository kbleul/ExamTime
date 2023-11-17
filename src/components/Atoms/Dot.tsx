import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { screenWidth, screenHeight} from '../../utils/Data/data';


interface DotProps {
  x: any;
  index: number; 
  size: number;
}

const Dot: React.FC<DotProps> = ({ x, index, size }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [10, 30, 10],
      Extrapolate.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [0.2, 1, 0.2],
      Extrapolate.CLAMP
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: screenHeight * 0.013, 
    backgroundColor: '#0066B2',
    marginHorizontal: screenWidth * 0.03, 
    borderRadius: screenWidth * 0.015, 
  },
});