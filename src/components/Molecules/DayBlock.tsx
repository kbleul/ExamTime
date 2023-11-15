import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DayCircle from '../Atoms/DayCircle';
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
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#1E90FF',
        borderRadius: 5,
      },
      inActiveweekDaysContainer: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: "center",
        // backgroundColor: '#E8EAEE',
      },
      ActiveweekText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "PoppinsMedium",
        color: 'white',
        paddingBottom: 15,
      },
      inActiveweekText: {
        paddingBottom: 15,
        textAlign: "center",
        fontSize: 15,
        fontFamily: "PoppinsMedium",
        color: '#828484',
      },
      dotActive: {
        marginTop: 5,
        height: 10,
        width: 10,
        borderRadius: 50,
        backgroundColor: "#FDC738"
      },
      dotInactive: {
        marginTop: 5,
        height: 10,
        width: 10,
        borderRadius: 50,
        backgroundColor: "#1E90FF"
      },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'green',
    marginTop: 5,
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
    marginTop: 5,
  },
});

export default DayBlock;