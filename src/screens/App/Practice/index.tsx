import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import SubjectSelectViewBox from '../../../components/Organisms/SubjectSelectViewBox';
import Tips from '../../../components/Molecules/Tips';
import FullExams, {
  ExamCatagories,
} from '../../../components/Organisms/FullExams';
import TrialHeader from '../../../components/Organisms/TrialHeader';
import RandomQuestions from '../../../components/Organisms/RandomQuestions';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {AuthContext} from '../../../Realm/model';
import {Subject} from '../../../Realm';
import Toast from 'react-native-toast-message';

export let availableHeight = screenHeight - screenHeight * 0.088;

const Practice = () => {
  const {useQuery} = AuthContext;
  const savedSubjects = useQuery(Subject);

  const [selectedSubject, setSelectedSubject] = useState(savedSubjects[0]);
  const [selectedExamType, setSelectedExamType] = useState(
    ExamCatagories[0].name,
  );

  return (
    <SafeAreaView style={[IndexStyle.container, styles.container]}>
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

        <Tips
          title={'TIPS & TRICKS FOR PHYSICS EXAM'}
          note="Your expected ability for this chapter is between 2.0 -- 2.4.
          Estimated your ability using the following Estimated your ability
          using the followin..."
          readonly={false}
        />

        <RandomQuestions selectedSubject={selectedSubject} />

        <FullExams
          selectedExamType={selectedExamType}
          setSelectedExamType={setSelectedExamType}
          selectedSubject={selectedSubject}
        />
      </ScrollView>

      <Toast />

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
  },
  headerContainer: {
    paddingHorizontal: screenWidth * 0.02,
  },
  headerTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: screenWidth * 0.05, //28
    color: '#000',
    lineHeight: screenHeight * 0.03, //34
    marginTop: screenWidth * 0.005,
  },
  headerSubTitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.043, //17 18
    color: '#C1C2C6',
  },
  BOX1: {
    height: availableHeight - 20,
    borderWidth: 1,
  },
});

export default Practice;
