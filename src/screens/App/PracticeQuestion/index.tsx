import React from 'react';
import {StyleSheet, View} from 'react-native';
import Question from '../../../components/Molecules/Question';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';

const PracticeQuestion = () => {
  return (
    <View style={styles.container}>
      <ExamSideNav />
      <ViewQuestionHeader title="Biology 2010 exam" />
      <Question />
      <ExamTimer />
      <MainBottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default PracticeQuestion;
