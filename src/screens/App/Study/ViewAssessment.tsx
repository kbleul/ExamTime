import {useNavigation} from '@react-navigation/native';
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
import Toast from 'react-native-toast-message';
import DirectionModal from '../../../components/Organisms/DirectionModal';
import ExamLeaveModal from '../../../components/Organisms/ExamLeaveModal';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
import Question from '../../../components/Molecules/Question';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import ExamSideNav from '../../../components/Organisms/ExamSideNav';
import {answersType, filterUnanswered} from '../PracticeQuestion';
import {IndexStyle} from '../../../styles/Theme/IndexStyle';
import {examQuestionType} from '../../../types';
import {AuthContext} from '../../../Realm/model';
import {Study} from '../../../Realm';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {calculate_and_Assign_UnitProgress} from './logic';

const ViewAssessment = ({route}) => {
  const {questions, selectedSubject, subjectId} = route.params;
  const navigator: any = useNavigation();

  const {useRealm, useQuery} = AuthContext;
  const realm = useRealm();
  const savedStudy = useQuery(Study, studyItem => {
    return studyItem.filtered(`id == "${subjectId}"`);
  });

  const flatListRef = useRef<FlatList<any> | null>(null);
  const [currentViewExam, setCurrentViewExam] = useState<any[] | null>([
    ...questions,
  ]);
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
    const backHandler: any = null;

    const backAction = () => {
      setExitExamModalVisible(prev => !prev);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler && backHandler.remove();
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
    if (showFullPage && currentViewExam) {
      refIndex.current < currentViewExam.length &&
        setTimeout(scrollToIndex, 500);
    }
  }, [showFullPage]);

  const filterUnansweredQuestions = () => {
    if (questions) {
      const filteredQusetions = filterUnanswered(questions, userAnswers || []);

      setCurrentViewExam([...filteredQusetions]);
      setCurrentQuestion(0);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
      }
    }
  };

  const resetViewQuesstions = () => {
    if (questions) {
      setCurrentViewExam([...questions]);
      setCurrentQuestion(0);
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
      }
    }
  };

  const handleSubmitExam = () => {
    if (questions && userAnswers && savedStudy && savedStudy[0]) {
      const answersArray: any[] = [];

      //save
      savedStudy[0].userExamAnswers.length === 0 &&
        calculate_and_Assign_UnitProgress(savedStudy[0], realm);

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

          savedStudy[0].userExamAnswers = answersArray;
        });
      } catch (e) {
        console.log('error', e);
      }

      navigator.navigate('Exam-Result', {
        userAnswers: userAnswers || [],
        total: questions.length,
        timeTaken: null,
        examQuestions: questions,
        isPracticeMode: false,
        isStudy: true,
      });
    } else {
      navigator.navigate('StudySection');
    }
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
      total={currentViewExam ? currentViewExam.length : 0}
      isPracticeMode={false}
      setUserAnswers={setUserAnswers}
      setDirection={setDirection}
      userAnswers={userAnswers}
    />
  );

  return (
    <View style={styles.container}>
      {currentViewExam && (
        <SafeAreaView
          style={
            showFullPage
              ? [IndexStyle.container, styles.container]
              : IndexStyle.container
          }>
          {showSideNav && <ExamSideNav setShowSideNav={setShowSideNav} />}

          <ViewQuestionHeader
            title={`Assessment Questions ${selectedSubject}`}
            setShowFullPage={setShowFullPage}
            showFullPage={showFullPage}
            unansweredQuestionsLength={
              questions
                ? userAnswers
                  ? questions.length - userAnswers.length
                  : 0
                : 0
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
              total: questions ? questions.length : 0,
              answered: userAnswers?.length || 0,
            }}
            resetViewQuesstions={resetViewQuesstions}
            handleSubmitExam={handleSubmitExam}
            timeLeft={false}
            showViewReviewBtn={
              currentViewExam
                ? questions && questions.length === currentViewExam.length
                  ? false
                  : true
                : false
            }
          />

          <DirectionModal direction={direction} setDirection={setDirection} />
        </SafeAreaView>
      )}

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

export default ViewAssessment;
