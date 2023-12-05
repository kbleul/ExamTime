import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

const CircleProgressBar = ({percentage}) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const currentPercentage = useRef(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 2000, // Animation duration in milliseconds
      useNativeDriver: true, // Set to true if possible for better performance
    }).start();

    currentPercentage.current = percentage;
  }, [percentage, animatedValue]);

  const interpolatedAnimation = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{rotate: interpolatedAnimation}],
            },
          ]}
        />
        <View style={styles.centerTextContainer}>
          <Text style={styles.centerText}>{currentPercentage.current}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'lightgray',
  },
  circle: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: 'white',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
    left: 70,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  centerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CircleProgressBar;
