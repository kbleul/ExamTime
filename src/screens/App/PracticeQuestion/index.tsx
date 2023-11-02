import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Question from '../../../components/Molecules/Question';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import {examQuestionType} from '../../../types';

const PracticeQuestion = ({route, navigation}) => {
  const {exam} = route.params;
  console.log('------------------------------', exam.examQuestion.length);
  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  return (
    <SafeAreaView
      style={
        showFullPage
          ? [IndexStyle.container, styles.container]
          : IndexStyle.container
      }>
      {showSideNav && <ExamSideNav setShowSideNav={setShowSideNav} />}

      <ViewQuestionHeader
        title={exam.examName}
        setShowSideNav={() => setShowSideNav(true)}
        setShowFullPage={setShowFullPage}
        showFullPage={showFullPage}
      />
      <ExamTimer />

      <ScrollView
        contentContainerStyle={showFullPage ? styles.scrollContent : {}}
        showsVerticalScrollIndicator={showFullPage}>
        {showFullPage &&
          exam.examQuestion.map((question: examQuestionType, index: number) => (
            <Question
              key={question.id}
              showFullPage={showFullPage}
              question={question}
              questionCounter={index + 1}
              total={exam.examQuestion.length}
            />
          ))}
      </ScrollView>
      <ExamNavigateButtons
        setExitExamModalVisible={setExitExamModalVisible}
        showFullPage={showFullPage}
      />

      <ExamLeaveModal
        exitExamModalVisible={exitExamModalVisible}
        setExitExamModalVisible={setExitExamModalVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

export default PracticeQuestion;
