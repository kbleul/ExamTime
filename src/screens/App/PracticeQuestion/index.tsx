import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Question from '../../../components/Molecules/Question';
import MainBottomNav from '../../../components/Organisms/MainBottomNav';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import {screenHeight} from '../../../utils/Data/data';

const PracticeQuestion = () => {
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
        title="Biology 2010 exam"
        setShowSideNav={() => setShowSideNav(true)}
        setShowFullPage={setShowFullPage}
        showFullPage={showFullPage}
      />
      <ExamTimer />

      <ScrollView
        contentContainerStyle={showFullPage ? styles.scrollContent : {}}
        showsVerticalScrollIndicator={showFullPage}>
        <Question showFullPage={showFullPage} />
        {showFullPage && (
          <>
            <Question showFullPage={showFullPage} />
            <Question showFullPage={showFullPage} />
            <Question showFullPage={showFullPage} />
            <Question showFullPage={showFullPage} />
            <Question showFullPage={showFullPage} />
            <Question showFullPage={showFullPage} />
          </>
        )}
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
