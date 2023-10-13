import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {DummyDataScience, screenHeight} from '../../../utils/Data/data';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import SignedUpHeader from '../../../components/Organisms/SignedUpHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import HeaderCarousel from '../../../components/Organisms/HeaderCarousel';
import ChosenCourses from '../../../components/Molecules/ChosenAndOtherCourses.tsx';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        contentContainerStyle={style.ScrollView}
        showsVerticalScrollIndicator={false}>
        {user ? (
          <SignedUpHeader type="Dashboard" />
        ) : (
          <TrialHeader type="Dashboard" />
        )}

        <HeaderCarousel />

        <ChosenCourses />
      </ScrollView>
      <MainBottomNav />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: screenHeight,
    width: '100%',
    padding: 5,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingBottom: 80,
  },
  ScrollView: {
    height: screenHeight,
  },
});
export default Index;
