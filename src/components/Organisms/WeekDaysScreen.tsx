import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenHeight, screenWidth } from '../../utils/Data/data';
import DayBlock from '../Molecules/DayBlock';

interface Day {
  dayNumber: number;
  dayName: string;
  isActive: boolean;
}

const days: Day[] = [
  {
    dayNumber: 30,
    dayName: 'Sun',
    isActive: true,
  },
  {
    dayNumber: 1,
    dayName: 'Mon',
    isActive: false,
  },
  {
    dayNumber: 2,
    dayName: 'Tue',
    isActive: false,
  },
  {
    dayNumber: 3,
    dayName: 'Wed',
    isActive: false,
  },
  {
    dayNumber: 5,
    dayName: 'Thu',
    isActive: false,
  },
  {
    dayNumber: 6,
    dayName: 'Fri',
    isActive: false,
  },
  {
    dayNumber: 7,
    dayName: 'Sat',
    isActive: false,
  },
];

const WeekDaysScreen: React.FC = () => {
  const showToast = () => {
  };

  return (
    <View style={styles.ThisContainer}>
      <View style={styles.ThisContainerHeader}>
        <Text style={styles.ThisContainerHeaderWeekText}>Week</Text>

        <TouchableNativeFeedback onPress={showToast}>
          <View style={styles.ViewCalander}>
            <Text style={styles.calandertext}>View Calander</Text>
            <Icon name="angle-right" size={15} color="#908F92" />
          </View>
        </TouchableNativeFeedback>

      </View>
      <View style={styles.divider} />
      <View style={styles.weekdaysContainer}>
        {days.map((day) => (
          <DayBlock key={day.dayNumber} day={day} />
        ))}
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  ThisContainer: {
    overflow:"hidden",
    width: screenWidth - (screenWidth * 0.04),
    marginHorizontal: screenWidth * 0.02,
    marginBottom: screenHeight * 0.01,
    padding: screenWidth * 0.02,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: '#FAFCFA',
  },
  ThisContainerHeader: {
    paddingHorizontal: screenWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
  ThisContainerHeaderWeekText: {
    textAlign: "center",
    fontSize: screenHeight * 0.022,
    fontFamily: "PoppinsMedium",
    color: '#BBBCC3',
  },
  ViewCalander: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  calandertext: {
    textAlign: "center",
    gap: screenWidth * 0.02,
    fontFamily: "Poppins",
    color: '#BBBCC3',
  },
  divider: {
    width: "95%",
    marginVertical: screenHeight * 0.01,
    marginHorizontal: screenWidth * 0.25,
    height: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  weekdaysContainer: {
    padding: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
});

export default WeekDaysScreen;