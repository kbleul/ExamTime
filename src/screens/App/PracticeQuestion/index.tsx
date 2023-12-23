import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Question from '../../../components/Molecules/Question';
import ExamTimer from '../../../components/Molecules/ExamTimer';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import {examQuestionType} from '../../../types';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import DirectionModal from '../../../components/Organisms/DirectionModal';
import {AuthContext} from '../../../Realm/model';
import {Exam} from '../../../Realm';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {useNavContext} from '../../../context/bottomNav';

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

const PracticeQuestion = ({route}: {route: any}) => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;

  const {exam, isPracticeMode} = route.params;

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();
  const savedExam = useQuery(Exam, examItems => {
    return examItems.filtered(`id == "${exam.id}"`);
  });

  const navigator: any = useNavigation();
  const flatListRef = useRef<FlatList<any> | null>(null);
  const formatedTime = formatTime(exam.duration);
  const [timer, setTimer] = useState(formatedTime);
  const [startTimer, setStartTimer] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const [currentViewExam, setCurrentViewExam] = useState(exam.examQuestion);

  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState<answersType[] | null>(null);

  const [direction, setDirection] = useState<string | null>(null);

  const {setShowNavigation} = useNavContext();

  const refIndex = useRef(0);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewCallBack = React.useCallback((viewableItems: any) => {
    refIndex.current = viewableItems.changed[0].index;
    // Use viewable items in state or as intended
  }, []);

  const filterUnansweredQuestions = () => {
    const filteredQusetions = filterUnanswered(
      exam.examQuestion,
      userAnswers || [],
    );

    setCurrentViewExam([...filteredQusetions]);
    setCurrentQuestion(0);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  const resetViewQuesstions = () => {
    setCurrentViewExam(exam.examQuestion);
    setCurrentQuestion(0);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
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

          realm.create(LocalObjectDataKeys.ExamAnswers, {
            examId: savedExam[0].id,
            examDate: new Date().toISOString(),
            userExamAnswers: [...answersArray],
            timeStamp: new Date(),
          });

          savedExam[0].isExamTaken = true;
          savedExam[0].lastTaken = new Date();
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
      isPracticeMode,
    });
  };

  useEffect(() => {
    const backAction = () => {
      setExitExamModalVisible(prev => !prev);
      return true;
    };

    let backHandler: any;

    if (currentScreen === 'Exam-View') {
      backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
    } else {
      backHandler && backHandler.remove();
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [currentScreen]);

  useEffect(() => {
    setStartTimer(true);
    setShowNavigation(false);
  }, []);

  const scrollToIndex = () => {
    flatListRef &&
      flatListRef.current &&
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentQuestion,
      });
  };

  useEffect(() => {
    if (showFullPage) {
      refIndex.current < currentViewExam.length &&
        setTimeout(scrollToIndex, 500);
    }
  }, [showFullPage]);

  useEffect(() => {
    isTimeOver && setTimeout(handleSubmitExam, 2500);
  }, [isTimeOver]);

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
      userAnswers={userAnswers}
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
        unansweredQuestionsLength={
          userAnswers ? exam.examQuestion.length - userAnswers.length : 0
        }
        filterUnansweredQuestions={filterUnansweredQuestions}
        setCurrentQuestion={setCurrentQuestion}
        refIndex={refIndex}
      />
      {!isPracticeMode && (
        <ExamTimer
          formatedTime={formatedTime}
          timer={timer}
          setTimer={setTimer}
          startTimer={startTimer}
          setIsTimeOver={setIsTimeOver}
          setExitExamModalVisible={setExitExamModalVisible}
        />
      )}

      {currentViewExam.length === 0 && (
        <Text style={styles.emptyText}>No more questions left !</Text>
      )}

      {!showFullPage && currentViewExam?.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={showFullPage}>
          <Question
            key={
              currentViewExam[currentQuestion]
                ? currentViewExam[currentQuestion].id
                : '---'
            }
            showFullPage={showFullPage}
            question={
              refIndex.current
                ? currentViewExam[refIndex.current]
                : currentViewExam[currentQuestion]
            }
            questionCounter={currentQuestion + 1}
            total={currentViewExam.length}
            isPracticeMode={isPracticeMode}
            setUserAnswers={setUserAnswers}
            setDirection={setDirection}
            userAnswers={userAnswers}
          />
        </ScrollView>
      )}

      {showFullPage && currentViewExam?.length > 0 && (
        <View style={styles.scrollContentFullPage}>
          <FlatList
            ref={flatListRef}
            data={currentViewExam}
            initialNumToRender={10}
            renderItem={({item, index}) => renderItem({item, index})}
            keyExtractor={item => item.id.toString()}
            numColumns={1} // Set the number of columns to 2 for a 2-column layout
            onViewableItemsChanged={onViewCallBack}
            viewabilityConfig={viewConfigRef.current}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  animated: true,
                  index: info.index,
                  viewPosition: 0.5,
                });
              });
            }}
          />
        </View>
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
        resetViewQuesstions={resetViewQuesstions}
        handleSubmitExam={handleSubmitExam}
        timeLeft={isPracticeMode ? false : timer}
        isTimeOver={isTimeOver}
        showViewReviewBtn={
          currentViewExam
            ? exam.examQuestion.length === currentViewExam.length
              ? exam.examQuestion.length === userAnswers?.length
                ? true
                : false
              : true
            : false
        }
      />

      <DirectionModal direction={direction} setDirection={setDirection} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    zIndex: 100,
  },
  scrollContent: {
    paddingBottom: 65,
  },
  scrollContentFullPage: {
    paddingBottom: 140,
  },
  emptyText: {
    color: 'black',
    paddingTop: 50,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
});

export default PracticeQuestion;
