import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import DayBlock from '../Molecules/DayBlock';
import scale from '../../utils/Functions/Scale';
import {AuthContext} from '../../Realm/model';
import {Challange} from '../../Realm';
import {
  calculateWeeks,
  getDaysOfArray,
} from '../../screens/App/Challenge/logic';

const WeekDaysScreen: React.FC = () => {
  const {useQuery} = AuthContext;

  const savedChallenge = useQuery(Challange);

  const weeks = useMemo(() => {
    return savedChallenge && savedChallenge[0]
      ? calculateWeeks(savedChallenge[0].challengeDay)
      : [];
  }, [savedChallenge]);
  const daysArray = getDaysOfArray(savedChallenge[0].challengeDay, weeks);

  return (
    <>
      {savedChallenge && savedChallenge.length > 0 && (
        <View style={styles.ThisContainer}>
          <View style={styles.ThisContainerHeader}>
            <Text style={styles.ThisContainerHeaderWeekText}>This Week</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.weekdaysContainer}>
            {daysArray.map((day, index) => (
              <DayBlock key={day.id + 'days' + index} day={day} />
            ))}
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  ThisContainer: {
    overflow: 'hidden',
    width: screenWidth - 20,
    marginBottom: screenHeight * 0.01,
    marginVertical: screenHeight * 0.016,
    padding: screenWidth * 0.02,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgrey',
    shadowColor: 'rgba(0, 0, 0.7, 0.7)',
    backgroundColor: '#fff',
  },
  ThisContainerHeader: {
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ThisContainerHeaderWeekText: {
    textAlign: 'center',
    fontSize: scale(13),
    fontFamily: 'PoppinsMedium',
    color: '#BBBCC3',
  },
  ViewCalander: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  calandertext: {
    fontSize: scale(12),
    textAlign: 'center',
    gap: screenWidth * 0.02,
    fontFamily: 'Poppins',
    color: '#BBBCC3',
  },
  divider: {
    width: '95%',
    marginVertical: screenHeight * 0.01,
    marginHorizontal: screenWidth * 0.25,
    height: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  weekdaysContainer: {
    paddingHorizontal: screenWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default WeekDaysScreen;
