import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../utils/Data/data';
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
    // Implement your logic for showing toast
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
    {/* <Divider style={{ flex: 1, width: "100%", height: 2, backgroundColor: 'red' }} /> */}
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
        width: screenWidth - 20,
        marginHorizontal: 10,
        padding: screenWidth * 0.02,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        backgroundColor: "#FAFCFA"
    
    
    
      },
      ThisContainerHeader: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%"
      },
      ThisContainerHeaderWeekText: {
        textAlign: "center",
        fontSize: 18,
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
        fontSize: 15,
        fontFamily: "Poppins",
        color: '#BBBCC3',
      },
      divider: {
        width: "100%",
        marginVertical: 10,
        marginHorizontal: 122,
        height: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      weekdaysContainer: {
        padding: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%"
      },
  });
  
  export default WeekDaysScreen;