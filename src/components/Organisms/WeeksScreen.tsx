import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import WeekContainer from '../Molecules/WeekContainer';
import {screenWidth} from '../../utils/Data/data';
import {AuthContext} from '../../Realm/model';
import {Challange} from '../../Realm';
import {calculateWeeks} from '../../screens/App/Challenge/logic';

const WeeksScreen: React.FC = () => {
  const {useQuery} = AuthContext;

  const savedChallenge = useQuery(Challange);

  const weeks = useMemo(() => {
    return savedChallenge && savedChallenge[0]
      ? calculateWeeks(savedChallenge[0].challengeDay)
      : [];
  }, [savedChallenge]);

  return (
    <View style={styles.weeksContainer}>
      {weeks.map(week => (
        <WeekContainer
          key={week.id}
          weekId={week.id}
          isActive={week.isActive}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weeksContainer: {
    flex: 1,
    width: screenWidth - 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default WeeksScreen;
