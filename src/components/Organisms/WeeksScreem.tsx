import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeekContainer from '../Molecules/WeekContainer';
import { screenWidth } from '../../utils/Data/data';

interface Week {
  id: number;
  isActive: boolean;
}

const weeks: Week[] = [
  {
    id: 1,
    isActive: false,
  },
  {
    id: 2,
    isActive: false,
  },
  {
    id: 3,
    isActive: true,
  },
  {
    id: 4,
    isActive: false,
  },
];

const WeeksScreen: React.FC = () => {
  return (
    <View style={styles.weeksContainer}>
      {weeks.map((week) => (
        <WeekContainer key={week.id} weekId={week.id} isActive={week.isActive} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weeksContainer: {
    marginHorizontal: screenWidth * 0.03,
    flex: 1,
    width: screenWidth - (screenWidth * 0.06),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default WeeksScreen;