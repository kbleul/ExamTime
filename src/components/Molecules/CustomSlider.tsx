import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step: number;
  onValueChange: (value: number) => void;
}

const CustomSlider: React.FC<SliderProps> = ({
  value,
  minimumValue,
  maximumValue,
  step,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.sliderContainer}
        minimumValue={5}
        maximumValue={100}
        step={5}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        thumbImage={require('../../assets/Images/frame4.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20, // Adjust the height as desired
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  sliderContainer: {
    width: '100%',
    height: 10,
  },
  stepsContainer: {
    marginRight: 10,
  },
  step: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
  },
  trackStyle: {
    height: 10, // Adjust the height as desired
  },
});

export default CustomSlider;
