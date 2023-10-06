import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_from_localStorage} from '../../utils/Functions/Get';
import {LocalStorageDataKeys, allowedTrialDays} from '../../utils/Data/data';
import {calculateDateDifference} from '../../screens/App/Onboarding/Logic';
import {HeaderStyle} from '../../styles/Theme/HeaderBox';

const TrialHeader: React.FC<{type: string}> = ({type}) => {
  const [trialDayCounter, setTrialDayCounter] = useState<number | null>(null);

  useEffect(() => {
    const getTrialDay = async () => {
      const trialDay = await get_from_localStorage(
        LocalStorageDataKeys.trialStartDate,
      );

      if (trialDay.status && trialDay.value) {
        console.log(trialDay);
        const remainingDays = calculateDateDifference(trialDay?.value);
        setTrialDayCounter(allowedTrialDays - remainingDays);
      }
    };

    getTrialDay();
  }, []);

  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.subContainer}>
        <Text style={HeaderStyle.trialText}>Trial Mode</Text>
        <Text style={HeaderStyle.typeText}>{type}</Text>
      </View>
      <View style={HeaderStyle.leftContainer}>
        <Text style={HeaderStyle.leftContainer_text}>
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

export default TrialHeader;
