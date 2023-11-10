import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, Animated } from 'react-native-svg';

const CircleProgressBar = ({ percentage }) => {
  const progressRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [percentage, animatedValue]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const progress = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, circumference],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.circleContainer}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          ref={progressRef}
          cx={radius}
          cy={radius}
          r={radius}
          fill="transparent"
          stroke="lightgray"
          strokeWidth={10}
        />
        <AnimatedCircle
          cx={radius}
          cy={radius}
          r={radius}
          fill="transparent"
          stroke="blue"
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </Svg>
      <View style={styles.centerTextContainer}>
        <Text style={styles.centerText}>{percentage}%</Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Index = () => {
  const percentage = 26;

  return (
    <View style={styles.container}>
      <View style={styles.Headercontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Find your path to success through new knowledge
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Start Challenge</Text>
          </View>
        </View>
        <View style={styles.right}>
          <CircleProgressBar percentage={percentage} />
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
  Headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right: {
    marginLeft: 20,
  },
  circleContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 25,
    left: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  centerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Index;