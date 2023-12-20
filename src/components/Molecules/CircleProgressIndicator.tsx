import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {scale} from 'react-native-size-matters';

const CircleProgressIndicator = ({progress}: {progress: number}) => {
  return (
    <AnimatedCircularProgress
      size={scale(90)}
      width={3}
      backgroundWidth={2}
      fill={progress}
      tintColor="white"
      backgroundColor="#FFE48F"
      rotation={0}>
      {fill => (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: scale(24),
              fontFamily: 'PoppinsMedium',
              color: 'white',
            }}>
            {Math.round(fill)}%
          </Text>
          <Text
            style={{
              fontSize: scale(7),
              fontFamily: 'PoppinsRegular',
              color: 'white',
            }}>
            Complated
          </Text>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    position: 'relative',
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenHeight * 0.018,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CircleProgressIndicator;
