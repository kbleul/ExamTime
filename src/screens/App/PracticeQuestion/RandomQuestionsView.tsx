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
import DirectionModal from '../../../components/Organisms/DirectionModal';
import {useGetRandomExamMutation} from '../../../reduxToolkit/Services/auth';
import {filterUnanswered} from './index';
const RandomQuestionsView = () => {
  //   const {subject} = route.params;
  const navigator: any = useNavigation();

  const [getRandomExam, {isLoading, error}] = useGetRandomExamMutation();

  const [currentViewExam, setCurrentViewExam] = useState(null);

  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState<answersType[] | null>(null);

  const [direction, setDirection] = useState<string | null>(null);

  useEffect(() => {
    const getExam = async () => {
      const response = await getRandomExam({
        grade: 'grade_8',
        subject: 'Biology',
        noOfQuestions: 20,
      }).unwrap();

      setCurrentViewExam(response.randomQuestions);
    };

    getExam();
  }, []);

  const filterUnansweredQuestions = () => {
    const filteredQusetions = filterUnanswered(
      currentViewExam,
      userAnswers || [],
    );

    setCurrentViewExam([...filteredQusetions]);
  };

  const handleSubmitExam = () => {
    navigator.navigate('Exam-Result', {
      userAnswers: userAnswers || [],
      total: currentViewExam.length,
      timeTaken: null,
      examQuestions: currentViewExam,
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
    <>
      {!isLoading && !error && currentViewExam && (
        <SafeAreaView
          style={
            showFullPage
              ? [IndexStyle.container, styles.container]
              : IndexStyle.container
          }>
          {showSideNav && <ExamSideNav setShowSideNav={setShowSideNav} />}

          <ViewQuestionHeader
            title={'Random Exam'}
            setShowFullPage={setShowFullPage}
            showFullPage={showFullPage}
          />

          {!showFullPage && (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={showFullPage}>
              <Question
                key={currentViewExam[currentQuestion].id}
                showFullPage={showFullPage}
                question={currentViewExam[currentQuestion]}
                questionCounter={currentQuestion + 1}
                total={currentViewExam.length}
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
            isReview={true}
          />

          {/*
      <PracticeModeModal
        practiceModeModalVisible={practiceModeModalVisible}
        setPracticeModeModalVisible={setPracticeModeModalVisible}
        setIsPracticeMode={setIsPracticeMode}
        setStartTimer={setStartTimer}
      /> */}

          <DirectionModal direction={direction} setDirection={setDirection} />
        </SafeAreaView>
      )}
    </>
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

export default RandomQuestionsView;
