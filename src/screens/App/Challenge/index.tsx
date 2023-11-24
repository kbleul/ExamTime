import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableNativeFeedback, ToastAndroid, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { screenWidth, screenHeight } from '../../../utils/Data/data';
import BackWithItem from '../../../components/Organisms/BackWithItem';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressHeader from '../../../components/Organisms/ProgressHeader';
import WeeksScreen from '../../../components/Organisms/WeeksScreem';
import WeekDaysScreen from '../../../components/Organisms/WeekDaysScreen';
import SubjectAccordion from '../../../components/Organisms/SubjectAccordion';
const { width, height } = Dimensions.get('window');
const Index = () => {


  console.log('Device width:', width);
  console.log('Device height:', height);
  const SubjectUnikt = [
    { unit: 'Unit One', lesson: "Cell Biology", progress: 0 },
    { unit: 'Unit Two', lesson: "Metabolis", progress: 0 },
    { unit: 'Unit Three', lesson: "Bio-technology", progress: 0 },

  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backicon}>
          <BackWithItem type="Challenge Path" />
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
    backgroundColor:"#FBFDFF"
  },
  backicon: {
    marginTop: screenHeight * 0.023,
  },

});

export default Index;