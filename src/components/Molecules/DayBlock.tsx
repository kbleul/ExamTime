import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DayCircle from '../Atoms/DayCircle';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {ChallangeDayType} from '../../types';
import {parseDate} from '../../screens/App/Challenge/logic';

const DayBlock: React.FC<{day: ChallangeDayType}> = ({day}) => {
  const parsedDate = useMemo(() => {
    return parseDate(day.scheduledDate);
  }, [day.scheduledDate]);

  return (
    <>
      {parsedDate && (
        <View
          style={
            parsedDate.isActive
              ? styles.ActiveweekDaysContainer
              : styles.inActiveweekDaysContainer
          }>
          <Text
            style={
              parsedDate.isActive
                ? styles.ActiveweekText
                : styles.inActiveweekText
            }>
            {parsedDate.day}
          </Text>
          <DayCircle
            dayNumber={parsedDate.date}
            isActive={parsedDate.isActive}
          />
          <View
            style={parsedDate.isActive ? styles.dotActive : styles.dotInactive}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ActiveweekDaysContainer: {
    paddingHorizontal: screenWidth * 0.01,
    paddingTop: screenHeight * 0.012,
    paddingBottom: screenHeight * 0.014,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: screenWidth * 0.01,
    overflow: 'hidden',
    marginHorizontal: screenWidth * 0.0155,
  },
  inActiveweekDaysContainer: {
    paddingTop: screenHeight * 0.012,
    paddingBottom: screenHeight * 0.014,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: screenWidth * 0.0155,
  },
  ActiveweekText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.033,
    fontFamily: 'PoppinsBold',
    color: 'white',
    paddingBottom: screenHeight * 0.025,
  },
  inActiveweekText: {
    paddingBottom: screenHeight * 0.025,
    textAlign: 'center',
    fontSize: screenWidth * 0.033,
    fontFamily: 'PoppinsBold',
    color: '#828484',
  },
  dotActive: {
    marginTop: screenHeight * 0.01,
    height: screenHeight * 0.012,
    width: screenHeight * 0.012,
    borderRadius: screenHeight * 0.01,
    overflow: 'hidden',
    backgroundColor: '#FDC738',
  },
  dotInactive: {
    marginTop: screenHeight * 0.01,
    height: screenHeight * 0.012,
    width: screenHeight * 0.012,
    borderRadius: screenHeight * 0.01,
    overflow: 'hidden',
    backgroundColor: '#1E90FF',
  },
  activeDot: {
    width: screenWidth * 0.012,
    height: screenWidth * 0.012,
    borderRadius: screenWidth * 0.006,
    overflow: 'hidden',
    backgroundColor: 'green',
    marginTop: screenHeight * 0.01,
  },
  inactiveDot: {
    width: screenWidth * 0.012,
    height: screenWidth * 0.012,
    borderRadius: screenWidth * 0.006,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginTop: screenHeight * 0.01,
  },
});

export default DayBlock;
