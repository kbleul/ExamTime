import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {allowedTrialDays} from '../../utils/Data/data';
import {calculateDateDifference} from '../../screens/App/Onboarding/Logic';
import {HeaderStyle} from '../../styles/Theme/HeaderBox';
import {AuthContext} from '../../Realm/model';
import {UserData} from '../../Realm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';

const TrialHeader: React.FC<{type: string}> = ({type}) => {
  const isSubscribed = useSelector(
    (state: RootState) => state.auth.isSubscribed,
  );

  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const [trialDayCounter, setTrialDayCounter] = useState<number | null>(null);

  useEffect(() => {
    const getTrialDay = async () => {
      const createdAt = savedUserData[0].initialDate;

      const remainingDays = calculateDateDifference(createdAt);
      setTrialDayCounter(allowedTrialDays - remainingDays);
    };

    getTrialDay();
  }, []);
  return (
    <View
      style={
        isSubscribed
          ? [HeaderStyle.container, HeaderStyle.containerSubscribed]
          : HeaderStyle.container
      }>
      {trialDayCounter !== null && !isSubscribed && (
        <View style={HeaderStyle.leftContainer}>
          <Text style={HeaderStyle.leftContainer_text}>
            {trialDayCounter < 0 ? 0 : trialDayCounter} days left
          </Text>
          <MaterialCommunityIcons
            name="timer-sand-complete"
            color="#E2725B"
            size={20}
          />
        </View>
      )}
      <View style={HeaderStyle.subContainer}>
        <TouchableOpacity
          style={HeaderStyle.notificationBtn}
          touchSoundDisabled>
          <Text style={HeaderStyle.dot} />
          <MaterialIcons name="notifications-none" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrialHeader;
