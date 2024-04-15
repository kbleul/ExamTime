import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import HeaderCarousel from '../../../components/Organisms/HeaderCarousel';
import ChosenCourses from '../../../components/Molecules/ChosenAndOtherCourses';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import useHandleInitialRequests from '../../../hooks/useHandleInitialRequests';
import {STATUSTYPES, screenHeight, screenWidth} from '../../../utils/Data/data';
import LoginModal from '../../../components/Organisms/LoginModal';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {useNavContext} from '../../../context/bottomNav';
import {useUserStatus} from '../../../context/userStatus';
import LoginBox from '../../../components/Atoms/LoginBox';
import UpdateModal from '../../../components/Organisms/UpdateModal';

const Index = () => {
  const {userStatus} = useUserStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const {setShowNavigation} = useNavContext();

  useHandleInitialRequests(
    setIsSyncing,
    updateModalVisible,
    setUpdateModalVisible,
  );

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(true);
    }, []),
  );
  if (userStatus === STATUSTYPES.NotAuthorized) {
    return (
      <SafeAreaView style={IndexStyle.container}>
        <TrialHeader type="Dashboard" />
        <HeaderCarousel />

        <LoginBox
          title="Your trial period has ended!"
          subTitle="Please login or create an account to use the app's functions."
        />
      </SafeAreaView>
    );
  }

  if (userStatus === STATUSTYPES.Unsubscribed) {
    return (
      <SafeAreaView style={IndexStyle.container}>
        <TrialHeader type="Dashboard" />
        <HeaderCarousel />

        <LoginBox
          title="Your free trial period has ended!"
          subTitle="Please subscribe to keep using ExamTime"
          isSubscribe
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={IndexStyle.container}>
      <ScrollView
        contentContainerStyle={IndexStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        {isSyncing && <SyncingData title="Syncing data for offline use..." />}
        <TrialHeader type="Dashboard" />

        <HeaderCarousel />

        <ChosenCourses setLoginModalVisible={setLoginModalVisible} />
      </ScrollView>

      <LoginModal
        loginModalVisible={loginModalVisible}
        setLoginModalVisible={setLoginModalVisible}
      />

      <UpdateModal updateModalVisible={updateModalVisible} />
      <Toast />
    </SafeAreaView>
  );
};

const SyncingData = ({title}: {title: string}) => {
  return (
    <View style={syncStyle.container}>
      <ActivityIndicator size={12} color="#000" />
      <Text style={syncStyle.text}>{title}</Text>
    </View>
  );
};

const syncStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    paddingVertical: screenHeight * 0.03,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: screenWidth * 0.03,
    marginLeft: 3,
  },
});
export default Index;
