import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import Question from '../../../components/Molecules/Question';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import {examQuestionType} from '../../../types';
import {useNavigation} from '@react-navigation/native';
import DirectionModal from '../../../components/Organisms/DirectionModal';
import {useGetRandomExamMutation} from '../../../reduxToolkit/Services/auth';
import {answersType, filterUnanswered} from './index';
import Toast from 'react-native-toast-message';
import {View} from 'react-native';
import Loading from '../../../components/Atoms/Loading';
import {checkIsOnline} from '../../../utils/Functions/Helper';
const RandomQuestionsView = ({route}: {route: any}) => {
  //   const {subject} = route.params;
  const navigator: any = useNavigation();
  const flatListRef = useRef<FlatList<any> | null>(null);

  const {selectedSubject, amount} = route.params;
  const [getRandomExam, {isLoading, error}] = useGetRandomExamMutation();

  const [exam, setExam] = useState<any[] | null>(null);

  const [currentViewExam, setCurrentViewExam] = useState<any[] | null>(null);

  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  const [showSideNav, setShowSideNav] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userAnswers, setUserAnswers] = useState<answersType[] | null>(null);

  const [direction, setDirection] = useState<string | null>(null);

  const refIndex = useRef(0);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewCallBack = React.useCallback((viewableItems: any) => {
    refIndex.current = viewableItems.changed[0].index;
    // Use viewable items in state or as intended
  }, []);

  useEffect(() => {
    const backHandler = null;

    const getExam = async () => {
      try {
        const response: any = await getRandomExam({
          grade: 'grade_8',
          subject: selectedSubject.subject.subject,
          noOfQuestions: amount,
        }).unwrap();

        setCurrentViewExam(response?.randomQuestions);
        setExam(response?.randomQuestions);

        const backAction = () => {
          isLoading || error
            ? navigator.navgate('Practice')
            : setExitExamModalVisible(prev => !prev);
          return true;
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler && backHandler.remove();
      } catch (err: any) {
        console.log(err?.data?.message, 'aaa');
        backHandler && backHandler.remove();
      }
    };

    getExam();
  }, [error]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Fetch random exams failed.',
        text2:
          error?.data && error?.data?.message
            ? error.data.message
            : 'Unable to get exams',
      });

      if (!checkIsOnline(navigator)) {
        setTimeout(() => {
          navigator.navigate('Practice');
        }, 3000);
      }
    }
  }, [error]);

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

  const filterUnansweredQuestions = () => {
    if (exam) {
      const filteredQusetions = filterUnanswered(exam, userAnswers || []);

      setCurrentViewExam([...filteredQusetions]);
      setCurrentQuestion(0);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
      }
    }
  };

  const resetViewQuesstions = () => {
    if (exam) {
      setCurrentViewExam([...exam]);
      setCurrentQuestion(0);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
      }
    }
  };

  const handleSubmitExam = () => {
    if (exam) {
      navigator.navigate('Exam-Result', {
        userAnswers: userAnswers || [],
        total: exam.length,
        timeTaken: null,
        examQuestions: exam,
        isPracticeMode: false,
      });
    }
  };

  // useEffect(() => {
  //   const backHandler = null;

  //   // Clean up the event listener when the component is unmounted
  //   return () => backHandler && backHandler.remove();
  // }, [isLoading, error]);

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
      total={currentViewExam ? currentViewExam.length : 0}
      isPracticeMode={false}
      setUserAnswers={setUserAnswers}
      setDirection={setDirection}
      userAnswers={userAnswers}
    />
  );

  return (
    <View style={styles.container}>
      {!isLoading && !error && currentViewExam && (
        <SafeAreaView
          style={
            showFullPage
              ? [IndexStyle.container, styles.container]
              : IndexStyle.container
          }>
          {showSideNav && <ExamSideNav setShowSideNav={setShowSideNav} />}

          <ViewQuestionHeader
            title={`Random Questions ${selectedSubject?.subject?.subject}`}
            setShowFullPage={setShowFullPage}
            showFullPage={showFullPage}
            unansweredQuestionsLength={
              exam ? (userAnswers ? exam.length - userAnswers.length : 0) : 0
            }
            filterUnansweredQuestions={filterUnansweredQuestions}
            setCurrentQuestion={setCurrentQuestion}
            refIndex={refIndex}
          />

          {currentViewExam.length === 0 && (
            <Text style={styles.emptyText}>No more questions left !</Text>
          )}

          {!showFullPage && currentViewExam?.length > 0 && (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={showFullPage}>
              <Question
                key={currentViewExam[currentQuestion].id}
                showFullPage={showFullPage}
                question={
                  refIndex.current
                    ? currentViewExam[refIndex.current]
                    : currentViewExam[currentQuestion]
                }
                questionCounter={currentQuestion + 1}
                total={currentViewExam.length}
                isPracticeMode={false}
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
            totalQuestionsLength={currentViewExam ? currentViewExam.length : 0}
          />

          <ExamLeaveModal
            exitExamModalVisible={exitExamModalVisible}
            setExitExamModalVisible={setExitExamModalVisible}
            examStatusData={{
              total: exam ? exam.length : 0,
              answered: userAnswers?.length || 0,
            }}
            resetViewQuesstions={resetViewQuesstions}
            handleSubmitExam={handleSubmitExam}
            timeLeft={false}
            showViewReviewBtn={
              currentViewExam
                ? exam && exam.length === currentViewExam.length
                  ? false
                  : true
                : false
            }
          />

          <DirectionModal direction={direction} setDirection={setDirection} />
        </SafeAreaView>
      )}
      {isLoading && <Loading />}

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFDFF',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  scrollContentFullPage: {
    paddingBottom: 155,
  },
  emptyText: {
    color: 'black',
    paddingTop: 50,
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
  },
});

export default RandomQuestionsView;
