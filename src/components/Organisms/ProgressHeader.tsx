import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {screenWidth, screenHeight} from '../../utils/Data/data';
import CircleProgressIndicator from '../Molecules/CircleProgressIndicator';
import scale from '../../utils/Functions/Scale';

const ProgressHeader = () => {
  return (
    <View style={styles.Headercontainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Keep going, you're almost there! The study challenge is testing your
          limits and preparing you for greatness.
        </Text>
      </View>
      <View style={styles.right}>
        <CircleProgressIndicator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Headercontainer: {
    marginVertical: screenHeight * 0.007,
    marginHorizontal: screenWidth * 0.038,
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenHeight * 0.01,
    height: screenHeight / 7,
    borderRadius: screenWidth * 0.03,
    overflow: 'hidden',
  },
  textContainer: {
    width: '70%',
    alignItems: 'flex-start',
    gap: screenHeight * 0.02,
    justifyContent: 'space-between',
  },

  text: {
    fontFamily: 'PoppinsRegular',
    color: '#FFFFFF',
    fontSize: scale(14),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressHeader;
