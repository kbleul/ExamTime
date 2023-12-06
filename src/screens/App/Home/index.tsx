import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import HeaderCarousel from '../../../components/Organisms/HeaderCarousel';
import ChosenCourses from '../../../components/Molecules/ChosenAndOtherCourses';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import usePostSyncData from '../../../hooks/usePostSyncData';
import {screenWidth} from '../../../utils/Data/data';
import LoginModal from '../../../components/Organisms/LoginModal';

const Index = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  usePostSyncData(setIsSyncing);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  return (
    <SafeAreaView style={IndexStyle.container}>
      <ScrollView
        contentContainerStyle={IndexStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        {isSyncing && <SyncingData title="Syncing data..." />}
        <TrialHeader type="Dashboard" />

        <HeaderCarousel />

        <ChosenCourses setLoginModalVisible={setLoginModalVisible} />
      </ScrollView>
      <MainBottomNav />

      <LoginModal
        loginModalVisible={loginModalVisible}
        setLoginModalVisible={setLoginModalVisible}
      />
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
    paddingVertical: 10,
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
