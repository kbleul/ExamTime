import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DayCircleProps {
    isActive: boolean;
    dayNumber: number;
}

const DayCircle: React.FC<DayCircleProps> = ({ isActive, dayNumber }) => {
    const circleStyle = isActive ? styles.ActiveweekDaysTextCircle : styles.inActiveweekDaysTextCircle;
    const dayTextStyle = isActive ? styles.weekDaysText : styles.weekDaysText;

    return (
        <View style={[styles.circle, circleStyle]}>
            <Text style={dayTextStyle}>{dayNumber}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
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
      },
      inActiveweekDaysTextCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8EAEE',
        borderRadius: 50,
      },
    inactiveCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8EAEE',
    },
    weekDaysText: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "PoppinsMedium",
        color: '#2A3061',
      },
});

export default DayCircle;