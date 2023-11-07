import React, {useState} from 'react';
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
import DirectionModal from '../../../components/Organisms/DirectionModal';
import {AuthContext} from '../../../Realm/model';
import {Exam} from '../../../Realm';
import {LocalObjectDataKeys} from '../../../utils/Data/data';

export type answersType = {
  id: string;
  index: number;
  userAnswer: string;
  correctAnswer: string;
};

export const filterUnanswered = (
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

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();
  const id = exam.id;
  const savedExam = useQuery(Exam, examItems => {
    return examItems.filtered(`id == "${exam.id}"`);
  });

  const navigator: any = useNavigation();

  const formatedTime = formatTime(exam.duration);
  const [timer, setTimer] = useState(formatedTime);
  const [startTimer, setStartTimer] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const [currentViewExam, setCurrentViewExam] = useState(exam.examQuestion);
  const [practiceModeModalVisible, setPracticeModeModalVisible] =
    useState(true);
  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState<answersType[] | null>(null);

  const [direction, setDirection] = useState<string | null>(null);

  const filterUnansweredQuestions = () => {
    const filteredQusetions = filterUnanswered(
      exam.examQuestion,
      userAnswers || [],
    );

    setCurrentViewExam([...filteredQusetions]);
  };

  const handleSubmitExam = () => {
    if (savedExam[0] && userAnswers) {
      const answersArray: any[] = [];

      try {
        realm.write(() => {
          userAnswers.forEach(answerItem => {
            const newAnswer = realm.create(
              LocalObjectDataKeys.UserExamAnswers,
              {
                ...answerItem,
              },
            );

            answersArray.push(newAnswer);
          });

          savedExam[0].userExamAnswers = answersArray;
          savedExam[0].isExamTaken = true;

          console.log({savedExam: savedExam[0].userExamAnswers});
        });
      } catch (e) {
        console.log('error', e);
      }
    }
    navigator.navigate('Exam-Result', {
      userAnswers: userAnswers || [],
      total: exam.examQuestion.length,
      timeTaken: timer,
      examQuestions: exam.examQuestion,
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
      setDirection={setDirection}
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
        setShowFullPage={setShowFullPage}
        showFullPage={showFullPage}
      />
      <ExamTimer
        formatedTime={formatedTime}
        timer={timer}
        setTimer={setTimer}
        startTimer={startTimer}
        setIsTimeOver={setIsTimeOver}
        setExitExamModalVisible={setExitExamModalVisible}
      />

      {!showFullPage && currentViewExam.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={showFullPage}>
          <Question
            key={currentViewExam[currentQuestion].id}
            showFullPage={showFullPage}
            question={currentViewExam[currentQuestion]}
            questionCounter={currentQuestion + 1}
            total={exam.examQuestion.length}
            isPracticeMode={isPracticeMode}
            setUserAnswers={setUserAnswers}
            setDirection={setDirection}
          />
        </ScrollView>
      )}

      {showFullPage && (
        <FlatList
          data={currentViewExam}
          initialNumToRender={4}
          renderItem={({item, index}) => renderItem({item, index})}
          keyExtractor={item => item.id.toString()}
          numColumns={1} // Set the number of columns to 2 for a 2-column layout
        />
      )}
      <ExamNavigateButtons
        setExitExamModalVisible={setExitExamModalVisible}
        showFullPage={showFullPage}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        totalQuestionsLength={currentViewExam.length}
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
        isTimeOver={isTimeOver}
      />

      <PracticeModeModal
        practiceModeModalVisible={practiceModeModalVisible}
        setPracticeModeModalVisible={setPracticeModeModalVisible}
        setIsPracticeMode={setIsPracticeMode}
        setStartTimer={setStartTimer}
      />

      <DirectionModal direction={direction} setDirection={setDirection} />
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
