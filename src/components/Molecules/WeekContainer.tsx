import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Circle from '../Atoms/Weekcircle';
import { screenHeight } from '../../utils/Data/data';
// import Circle from './Circle';


interface WeekContainerProps {
  weekId: number;
  isActive: boolean;
}

const WeekContainer: React.FC<WeekContainerProps> = ({ weekId, isActive }) => {
  return (
    <View style={styles.weekContainer}>
      <Text style={styles.weekText}>Week</Text>
      <Circle id={weekId} isActive={isActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    marginVertical: screenHeight * 0.04,
    gap: screenHeight * 0.01,
  },
  weekText: {
    fontSize: screenHeight * 0.022,
    fontFamily: 'PoppinsMedium',
  },
});

export default WeekContainer;