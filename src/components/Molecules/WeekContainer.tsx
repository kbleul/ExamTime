import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Circle from '../Atoms/Weekcircle';
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
    marginVertical:10,
    gap: 5,
    alignItems: 'center',
  },
  weekText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
});

export default WeekContainer;