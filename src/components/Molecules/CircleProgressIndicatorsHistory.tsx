import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {scale} from 'react-native-size-matters';
import {screenWidth} from '../../utils/Data/data';

const CircleProgressIndicator = ({progress}: {progress: number}) => {
  return (
    <AnimatedCircularProgress
      size={screenWidth * 0.28}
      width={8}
      backgroundWidth={8}
      fill={progress}
      tintColor="#D9D9D9"
      backgroundColor="#4CD5C5"
      rotation={180}>
      {fill => (
        <View style={styles.circleTextContainer}>
          <Text style={styles.centerText}>{Math.round(fill)}%</Text>
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
    fontFamily: 'PoppinsSemiBold',
    fontSize: scale(22),
    color: 'black',
    lineHeight: scale(26),
  },
  centerTextSecondary: {
    fontFamily: 'PoppinsRegular',
    fontSize: scale(12),
    color: '#868B98',
  },
});

export default CircleProgressIndicator;
