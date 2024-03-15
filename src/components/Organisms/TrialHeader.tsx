import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {STATUSTYPES, screenWidth} from '../../utils/Data/data';
import {calculateDateDifference} from '../../screens/App/Onboarding/Logic';
import {HeaderStyle} from '../../styles/Theme/HeaderBox';
import {AuthContext} from '../../Realm/model';
import {UserData} from '../../Realm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {useNavigation} from '@react-navigation/native';
import {useNotification} from '../../context/notification';
import LoginModal from './LoginModal';
import {useUserStatus} from '../../context/userStatus';

const TrialHeader: React.FC<{type: string}> = ({type}) => {
  const navigator: any = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const {userStatus} = useUserStatus();

  const {notifications, hasNewNotification} = useNotification();
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const [trialDayCounter, setTrialDayCounter] = useState<number | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const getTrialDay = async () => {
      const createdAt = savedUserData[0].initialDate;

      const remainingDays = calculateDateDifference(createdAt);
      setTrialDayCounter(savedUserData[0].allowedTrialDays - remainingDays);
    };

    getTrialDay();
  }, []);

  return (
    <View style={HeaderStyle.container}>
      <Text style={HeaderStyle.nameText}>
        {user ? 'Hi, ' + user.firstName : 'Welcome'}
      </Text>

      <View style={HeaderStyle.container}>
        {trialDayCounter !== null &&
          userStatus === STATUSTYPES.Unsubscribed && (
            <View style={HeaderStyle.leftContainer}>
              <Text style={HeaderStyle.leftContainer_text}>
                {trialDayCounter < 0 ? 0 : trialDayCounter} days left
              </Text>
              <MaterialCommunityIcons
                name="timer-sand-complete"
                color="#E2725B"
                size={screenWidth * 0.05}
              />
            </View>
          )}
        <View style={HeaderStyle.subContainer}>
          <TouchableOpacity
            style={HeaderStyle.notificationBtn}
            touchSoundDisabled
            onPress={() =>
              !token && (!notifications || notifications.length === 0)
                ? setShowLoginPrompt(true)
                : navigator.navigate('Notification')
            }>
            {notifications && hasNewNotification && (
              <Text style={HeaderStyle.dot} />
            )}
            <MaterialIcons
              name="notifications-none"
              size={screenWidth * 0.075}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>

      <LoginModal
        loginModalVisible={showLoginPrompt}
        setLoginModalVisible={setShowLoginPrompt}
      />
    </View>
  );
};

export default TrialHeader;
