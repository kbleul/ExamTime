import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import HeaderCarousel from '../../../components/Organisms/HeaderCarousel';
import ChosenCourses from '../../../components/Molecules/ChosenAndOtherCourses';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import {useAuth} from '@realm/react';
import {AuthContext} from '../../../Realm/model';
import {Exam} from '../../../Realm';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reduxToolkit/Store';
import usePostSyncData from '../../../hooks/usePostSyncData';

const Index = () => {
  usePostSyncData();

  return (
    <SafeAreaView style={IndexStyle.container}>
      <ScrollView
        contentContainerStyle={IndexStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        <TrialHeader type="Dashboard" />

        <HeaderCarousel />

        <ChosenCourses />
      </ScrollView>
      <MainBottomNav />
    </SafeAreaView>
  );
};

export default Index;
