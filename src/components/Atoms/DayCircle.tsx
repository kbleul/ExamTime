import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

interface DayCircleProps {
  isActive: boolean;
  dayNumber: number;
}

const DayCircle: React.FC<DayCircleProps> = ({isActive, dayNumber}) => {
  const circleStyle = isActive
    ? styles.ActiveweekDaysTextCircle
    : styles.inActiveweekDaysTextCircle;
  const dayTextStyle = isActive ? styles.weekDaysText : styles.weekDaysText;

  return (
    <View style={[styles.circle, circleStyle]}>
      <Text style={dayTextStyle}>{dayNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.07,
    borderRadius: (screenWidth * 0.07) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  ActiveweekDaysTextCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
  },
  inActiveweekDaysTextCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAEE',
    borderRadius: 50,
    overflow: 'hidden',
  },
  inactiveCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAEE',
  },
  weekDaysText: {
    textAlign: 'center',
    fontSize: screenHeight * 0.018,
    fontFamily: 'PoppinsMedium',
    color: '#2A3061',
  },
});

export default DayCircle;
