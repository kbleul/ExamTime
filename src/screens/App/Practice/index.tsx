import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import {DummySubjects} from '../../../components/Molecules/ChosenAndOtherCourses';
import SubjectSelectViewBox from '../../../components/Organisms/SubjectSelectViewBox';
import Tips from '../../../components/Molecules/Tips';
import FullExams, {
  ExamCatagories,
} from '../../../components/Organisms/FullExams';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import RandomQuestions from '../../../components/Organisms/RandomQuestions';
import {screenHeight, screenWidth} from '../../../utils/Data/data';

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState(DummySubjects[0]);
  const [selectedExamType, setSelectedExamType] = useState(ExamCatagories[0]);

  return (
    <SafeAreaView style={[IndexStyle.container, styles.container]}>
      {/* <TrialHeader type="Practice" /> */}
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <TrialHeader type="Practice" />

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Study Section</Text>
          <Text style={styles.headerSubTitle}>Choose your Subject</Text>
        </View>

        <SubjectSelectViewBox
          SelectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />

        <Tips />

        <RandomQuestions />

        <FullExams
          selectedExamType={selectedExamType}
          setSelectedExamType={setSelectedExamType}
        />
      </ScrollView>

      <MainBottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  ScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  headerContainer: {
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.07, //28
    color: '#000',
    lineHeight: 32,
    marginTop: 10,
  },
  headerSubTitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.045, //17 18
    color: '#C1C2C6',
  },
});

export default Practice;
