import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Question from '../../../components/Molecules/Question';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';

const PracticeQuestion = () => {
  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <View style={styles.container}>
      <ExamLeaveModal
        exitExamModalVisible={exitExamModalVisible}
        setExitExamModalVisible={setExitExamModalVisible}
      />

      {showSideNav && <ExamSideNav setShowSideNav={setShowSideNav} />}

      <ViewQuestionHeader
        title="Biology 2010 exam"
        onPress={() => setShowSideNav(true)}
        setExitExamModalVisible={setExitExamModalVisible}
      />
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
