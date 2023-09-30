import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_from_localStorage} from '../../utils/Functions/Get';
import {LocalStorageDataKeys, allowedTrialDays} from '../../utils/Data/data';
import {calculateDateDifference} from '../../screens/App/Onboarding/components/Logic';

const TrialHeader: React.FC<{type: string}> = ({type}) => {
  const [trialDayCounter, setTrialDayCounter] = useState<number | null>(null);

  useEffect(() => {
    const getTrialDay = async () => {
      const trialDay = await get_from_localStorage(
        LocalStorageDataKeys.trialStartDate,
      );

      if (trialDay.status && trialDay.value) {
        const remainingDays = calculateDateDifference(trialDay?.value);
        setTrialDayCounter(allowedTrialDays - remainingDays);
      }
    };

    getTrialDay();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.trialText}>Trial Mode</Text>
        <Text style={styles.typeText}>{type}</Text>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.leftContainer_text}>
          {trialDayCounter && trialDayCounter} days left
        </Text>
        <MaterialCommunityIcons
          name="timer-sand-complete"
          color="#E2725B"
          size={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 5,
  },
  subContainer: {},
  trialText: {
    fontSize: 24,
    margin: 2,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  typeText: {
    margin: 4,
    marginBottom: 6,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  leftContainer: {
    margin: 2,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E2725B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer_text: {
    color: '#E2725B',
    marginRight: 2,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default TrialHeader;
