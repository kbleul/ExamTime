import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback, ToastAndroid, TouchableOpacity, ImageBackground } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressHeader from '../../../components/Organisms/ProgressHeader';
import WeeksScreen from '../../../components/Organisms/WeeksScreem';
import WeekDaysScreen from '../../../components/Organisms/WeekDaysScreen';
import SubjectAccordion from '../../../components/Organisms/SubjectAccordion';

const Index = () => {

  const SubjectUnikt = [
    { unit: 'Unit One', Lesson: "Cell Biology", progress: 0 },
    { unit: 'Unit Two', Lesson: "Metabolis", progress: 0 },
    { unit: 'Unit Three', Lesson: "Bio-technology", progress: 0 },

  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backicon}>
          <BackWithItem type="Challange Section" />
        </View>

        <ProgressHeader />

        <WeeksScreen />

        <WeekDaysScreen />
        <SubjectAccordion SubjectUnikt={SubjectUnikt} />

      </ScrollView>
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backicon: {
    marginTop: screenHeight * 0.023,
  },

});

export default Index;