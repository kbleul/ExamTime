import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {DummyDataScience, screenHeight} from '../../../utils/Data/data';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import AuthPrompt from '../../../components/Organisms/AuthPrompt';
import SignedUpHeader from '../../../components/Organisms/SignedUpHeader';
import SubjectsBox from '../../../components/Molecules/subjectsBox';
import GradeButton from '../../../components/Atoms/GradeBtn';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import HeaderCarousel from '../../../components/Organisms/HeaderCarousel';
import ChosenCourses from '../../../components/Molecules/ChosenAndOtherCourses.tsx';

const Index = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.ScrollView}>
        {user ? (
          <SignedUpHeader type="Dashboard" />
        ) : (
          <TrialHeader type="Dashboard" />
        )}

        <HeaderCarousel />

        <ChosenCourses />
      </ScrollView>
      <MainBottomNav />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: screenHeight,
    width: '98%',
    padding: 5,
    marginHorizontal: '1%',
    backgroundColor: '#F9FCFF',
    paddingVertical: 30,
    paddingBottom: 40,
    borderWidth: 4,
  },
  ScrollView: {
    height: screenHeight,
  },
});
export default Index;
