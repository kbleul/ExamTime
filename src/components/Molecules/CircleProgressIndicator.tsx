import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {scale} from 'react-native-size-matters';
import {number} from 'yup';

const CircleProgressIndicator = ({progress}: {progress: number}) => {
  let amount =
    typeof Math.round(progress) === typeof Math.round(0)
      ? Math.round(progress)
      : 0;

  if (amount < 0) {
    amount = 0;
  } else if (amount > 100) {
    amount = 100;
  }

  return (
    <AnimatedCircularProgress
      size={scale(90)}
      width={3}
      backgroundWidth={2}
      fill={progress}
      tintColor="white"
      backgroundColor="#FFE48F"
      rotation={0}>
      {() => (
        <View style={styles.circleTextContainer}>
          <Text style={styles.centerText}>{amount}%</Text>
          <Text style={styles.centerTextSecondary}>Completed</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  circleTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontFamily: 'PoppinsMedium',
    fontSize: scale(24),
    color: 'white',
  },
  centerTextSecondary: {
    fontFamily: 'PoppinsRegular',
    fontSize: scale(7),
    color: 'white',
  },
});

export default CircleProgressIndicator;
