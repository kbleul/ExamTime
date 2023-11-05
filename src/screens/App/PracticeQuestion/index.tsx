import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Question from '../../../components/Molecules/Question';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import PracticeModeModal from '../../../components/Organisms/PracticeModeModal';
import {examQuestionType} from '../../../types';
import {useNavigation} from '@react-navigation/native';

export type answersType = {
  id: string;
  index: number;
  userAnswer: string;
  correctAnswer: string;
};

const filterUnanswered = (
  examQuestions: examQuestionType[],
  answers: answersType[] | [],
) => {
  const answerIdArr = answers.map(answer => answer.id);

  const unansweredQuestions = examQuestions.filter(
    question => !answerIdArr.includes(question.id),
  );

  return unansweredQuestions;
};

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let timeString = '';

  if (hours < 1) {
    timeString += '00:';
  } else if (hours < 10) {
    timeString += '0' + hours.toString() + ':';
  } else {
    timeString += hours.toString() + ':';
  }

  timeString += remainingMinutes.toString().padStart(2, '0') + ':00';

  return timeString;
}

const PracticeQuestion = ({route}) => {
  const {exam} = route.params;

  const navigator: any = useNavigation();

  const formatedTime = formatTime(exam.duration);
  const [timer, setTimer] = useState(formatedTime);
  const [startTimer, setStartTimer] = useState(false);

  const [currentViewExam, setCurrentViewExam] = useState(exam.examQuestion);
  const [practiceModeModalVisible, setPracticeModeModalVisible] =
    useState(true);
  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(true);

  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const [userAnswers, setUserAnswers] = useState<answersType[] | null>(null);

  const filterUnansweredQuestions = () => {
    const filteredQusetions = filterUnanswered(
      exam.examQuestion,
      userAnswers || [],
    );

    setCurrentViewExam([...filteredQusetions]);
  };

  const handleSubmitExam = () => {
    navigator.navigate('Exam-Result', {
      userAnswers: userAnswers || [],
      total: exam.examQuestion.length,
      timeTaken: '1:20',
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: examQuestionType;
    index: number;
  }) => (
    <Question
      key={item.id}
      showFullPage={showFullPage}
      question={item}
      questionCounter={index + 1}
      total={currentViewExam.length}
      isPracticeMode={isPracticeMode}
      setUserAnswers={setUserAnswers}
    />
  );

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
      <ExamTimer
        formatedTime={formatedTime}
        timer={timer}
        setTimer={setTimer}
        startTimer={startTimer}
      />

      {/* <ScrollView
        contentContainerStyle={showFullPage ? styles.scrollContent : {}}
        showsVerticalScrollIndicator={showFullPage}>
        {showFullPage &&
          exam.examQuestion
            .slice(0, 4)
            .map((question: examQuestionType, index: number) => (
              <Question
                key={question.id}
                showFullPage={showFullPage}
                question={question}
                questionCounter={index + 1}
                total={exam.examQuestion.length}
                isPracticeMode={isPracticeMode}
              />
            ))}
      </ScrollView> */}

      <FlatList
        data={currentViewExam}
        renderItem={({item, index}) => renderItem({item, index})}
        keyExtractor={item => item.id.toString()}
        numColumns={1} // Set the number of columns to 2 for a 2-column layout
      />
      <ExamNavigateButtons
        setExitExamModalVisible={setExitExamModalVisible}
        showFullPage={showFullPage}
      />

      <ExamLeaveModal
        exitExamModalVisible={exitExamModalVisible}
        setExitExamModalVisible={setExitExamModalVisible}
        examStatusData={{
          total: exam.examQuestion.length,
          answered: userAnswers?.length || 0,
        }}
        filterUnansweredQuestions={filterUnansweredQuestions}
        handleSubmitExam={handleSubmitExam}
        timeLeft={timer}
      />

      <PracticeModeModal
        practiceModeModalVisible={practiceModeModalVisible}
        setPracticeModeModalVisible={setPracticeModeModalVisible}
        setIsPracticeMode={setIsPracticeMode}
        setStartTimer={setStartTimer}
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
