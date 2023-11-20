import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DayCircle from '../Atoms/DayCircle';
import { screenHeight, screenWidth } from '../../utils/Data/data';
// import DayCircle from './DayCircle';


interface Day {
  dayNumber: number;
  dayName: string;
  isActive: boolean;
}

interface DayBlockProps {
  day: Day;
}

const DayBlock: React.FC<DayBlockProps> = ({ day }) => {
  return (
    <View
      style={[
        day.isActive ? styles.ActiveweekDaysContainer : styles.inActiveweekDaysContainer,
      ]}
    >
      <Text style={day.isActive ? styles.ActiveweekText : styles.inActiveweekText}>{day.dayName}</Text>
      <DayCircle dayNumber={day.dayNumber} isActive={day.isActive} />
      <View style={day.isActive ? styles.dotActive : styles.dotInactive} />
    </View>
  );
};

const styles = StyleSheet.create({
    ActiveweekDaysContainer: {
      // paddingHorizontal: screenWidth * 0.01,
      // paddingVertical: screenHeight * 0.012,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1E90FF',
      borderRadius: screenWidth * 0.01,
      },
      inActiveweekDaysContainer: {
        paddingHorizontal: screenWidth * 0.01,
        paddingVertical: screenHeight * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
      },
      ActiveweekText: {
        textAlign: 'center',
        fontSize: screenHeight * 0.018,
        fontFamily: 'PoppinsMedium',
        color: 'white',
        paddingBottom: screenHeight * 0.03,
      },
      inActiveweekText: {
        paddingBottom: screenHeight * 0.03,
        textAlign: 'center',
        fontSize: screenHeight * 0.018,
        fontFamily: 'PoppinsMedium',
        color: '#828484',
      },
      dotActive: {
        marginTop: screenHeight * 0.01,
        height: screenHeight * 0.012,
        width: screenHeight * 0.012,
        borderRadius: screenHeight * 0.01,
        backgroundColor: '#FDC738',
      },
      dotInactive: {
        marginTop: screenHeight * 0.01,
        height: screenHeight * 0.012,
        width: screenHeight * 0.012,
        borderRadius: screenHeight * 0.01,
        backgroundColor: '#1E90FF',
      },
      activeDot: {
        width: screenWidth * 0.012,
        height: screenWidth * 0.012,
        borderRadius: screenWidth * 0.006,
        backgroundColor: 'green',
        marginTop: screenHeight * 0.01,
      },
      inactiveDot: {
        width: screenWidth * 0.012,
        height: screenWidth * 0.012,
        borderRadius: screenWidth * 0.006,
        backgroundColor: 'transparent',
        marginTop: screenHeight * 0.01,
      },
});

export default DayBlock;