import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Circle from '../Atoms/Weekcircle';
import {screenHeight} from '../../utils/Data/data';
import {scale} from 'react-native-size-matters';
// import Circle from './Circle';

interface WeekContainerProps {
  weekId: number;
  isActive: boolean;
}

const WeekContainer: React.FC<WeekContainerProps> = ({weekId, isActive}) => {
  return (
    <View style={styles.weekContainer}>
      <Text style={styles.weekText}>Week</Text>
      <Circle id={weekId} isActive={isActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: screenHeight * 0.001,
  },
  weekText: {
    color: '#000',
    fontSize: scale(14),
    fontFamily: 'PoppinsSemiBold',
  },
});

export default WeekContainer;
