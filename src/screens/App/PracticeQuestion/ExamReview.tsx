import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ViewQuestionHeader from '../../../components/Molecules/ViewQuestionHeader';
import {screenHeight, screenWidth} from '../../../utils/Data/data';
import {examQuestionType} from '../../../types';
import {answersType} from '.';
import Question from '../../../components/Molecules/Question';
import ExamNavigateButtons from '../../../components/Molecules/ExamNavigateButtons';
const CATAGORIES = ['Incorrect', 'Skipped', 'Correct'];

type newQuestionsArray = examQuestionType & {
  selectedAnswer?: string;
  correctAnswer?: string;
};
const filterQuestions = (
  userAnswers: answersType[] | [],
  examQuestions: examQuestionType[] | newQuestionsArray[],
  filterBy: string,
  setViewQuestionsArray: React.Dispatch<
    React.SetStateAction<examQuestionType[] | null>
  >,
) => {
  let newQuestionsArray: newQuestionsArray[] = [];

  switch (filterBy) {
    case CATAGORIES[0]:
      userAnswers.forEach(answer => {
        if (answer.userAnswer !== answer.correctAnswer) {
          const foundQuestion = examQuestions.find(
            question => question.id === answer.id,
          );

          foundQuestion &&
            newQuestionsArray.push({
              ...foundQuestion,
              selectedAnswer: answer.userAnswer,
              correctAnswer: answer.correctAnswer,
            });
        }
      });

      setViewQuestionsArray(newQuestionsArray);
      break;

    case CATAGORIES[1]:
      const answerIds: string[] = [];
      let answerObjArr: {
        selectedAnswer: string;
        correctAnswer: string;
      }[] = [];

      userAnswers.forEach(answer => {
        answerIds.push(answer.id);
      });

      newQuestionsArray = [
        ...examQuestions.filter(question => !answerIds.includes(question.id)),
      ];

      let tempArr: newQuestionsArray[] = [];

      console.log(
        '-------------------------------------------------------__',
        newQuestionsArray.length,
        answerObjArr.length,
      );
      newQuestionsArray.forEach(question => {
        tempArr.push({
          ...question,
          selectedAnswer: '',
        });
      });

      setViewQuestionsArray(tempArr);

      break;

    case CATAGORIES[2]:
      userAnswers.forEach(answer => {
        if (answer.userAnswer === answer.correctAnswer) {
          const foundQuestion = examQuestions.find(
            question => question.id === answer.id,
          );

          foundQuestion &&
            newQuestionsArray.push({
              ...foundQuestion,
              selectedAnswer: answer.userAnswer,
              correctAnswer: answer.correctAnswer,
            });
        }
      });
      setViewQuestionsArray(newQuestionsArray);

      break;
  }
};

const ExamReview = ({route}) => {
  const {userAnswers, examQuestions} = route.params;

  const [selectedCategory, setSelectedCategory] = useState(CATAGORIES[0]);

  const [viewQuestionsArray, setViewQuestionsArray] = useState<
    examQuestionType[] | newQuestionsArray[] | null
  >(null);

  const [showFullPage, setShowFullPage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [exitExamModalVisible, setExitExamModalVisible] = useState(false);

  useEffect(() => {
    filterQuestions(
      userAnswers,
      examQuestions,
      selectedCategory,
      setViewQuestionsArray,
    );
  }, [selectedCategory, examQuestions, userAnswers]);

  return (
    <View style={styles.contianer}>
      <Text>{userAnswers.length}</Text>

      <ViewQuestionHeader title={'Answer Review'} />

      <ButtonNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentQuestion={setCurrentQuestion}
      />

      {!showFullPage && viewQuestionsArray && viewQuestionsArray.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={showFullPage}>
          <Question
            key={viewQuestionsArray[currentQuestion].id}
            showFullPage={showFullPage}
            question={viewQuestionsArray[currentQuestion]}
            questionCounter={currentQuestion + 1}
            total={viewQuestionsArray.length}
            isPracticeMode={true}
            setDirection={setDirection}
            isReview={true}
          />
        </ScrollView>
      )}
      {viewQuestionsArray && viewQuestionsArray.length > 0 && (
        <ExamNavigateButtons
          setExitExamModalVisible={setExitExamModalVisible}
          showFullPage={showFullPage}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          totalQuestionsLength={viewQuestionsArray.length}
        />
      )}
    </View>
  );
};

const ButtonNav: React.FC<{
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}> = memo(({selectedCategory, setSelectedCategory, setCurrentQuestion}) => {
  return (
    <View style={buttonNavStyles.container}>
      {CATAGORIES.map(item => (
        <TouchableOpacity
          style={
            selectedCategory === item
              ? [buttonNavStyles.button, buttonNavStyles.buttonActive]
              : buttonNavStyles.button
          }
          touchSoundDisabled
          key={item}
          onPress={() => {
            setSelectedCategory(item);
            setCurrentQuestion(0);
          }}>
          <Text
            style={
              selectedCategory === item
                ? [buttonNavStyles.buttonText, buttonNavStyles.buttonTextActve]
                : buttonNavStyles.buttonText
            }>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: '#FBFDFF',
    position: 'relative',
    flex: 1,
    paddingBottom: screenHeight * 0.1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});

const buttonNavStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    padding: 4,
  },
  button: {
    backgroundColor: '#FBFDFF',
    width: '30%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  buttonActive: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: screenWidth * 0.03,
    paddingVertical: 10,
  },
  buttonTextActve: {
    color: 'white',
  },
});
export default ExamReview;
