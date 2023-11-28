import React, {memo, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {screenHeight, screenWidth} from '../../utils/Data/data';
import {examQuestionType} from '../../types';
import {answersType} from '../../screens/App/PracticeQuestion';
import {isHtml} from '../../utils/Functions/Helper';

const tagsStylesQuestion = {
  p: {
    whiteSpace: 'normal',
    color: '#000',
    textAlign: 'left',
    width: screenWidth * 0.8,
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    lineHeight: 25,
  },
  img: {
    width: screenWidth * 0.8,
    marginTop: 5,
  },
};
const tagsStylesChoice = {
  p: {
    whiteSpace: 'normal',
    color: '#000',
    textAlign: 'left',
    width: screenWidth * 0.65,
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  img: {
    width: screenWidth * 0.65,
  },
};

const Choice = ['A', 'B', 'C', 'D'];
const Question: React.FC<{
  showFullPage: boolean;
  question: examQuestionType;
  questionCounter: number;
  total: number;
  isPracticeMode: boolean;
  setUserAnswers?: React.Dispatch<React.SetStateAction<answersType[] | null>>;
  setDirection: React.Dispatch<React.SetStateAction<string | null>>;
  isReview?: boolean;
  userAnswers: answersType[] | null;
}> = ({
  showFullPage,
  question,
  questionCounter,
  total,
  isPracticeMode,
  setUserAnswers,
  setDirection,
  isReview,
  userAnswers,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  console.log('issssHtml', isHtml(question.question));

  return (
    <>
      {question && (
        <View
          style={
            showFullPage
              ? [styles.container, styles.containerFullPage]
              : styles.container
          }>
          <View
            style={
              showFullPage
                ? [styles.questionContainer, styles.questionContainerFullpage]
                : styles.questionContainer
            }>
            <View style={styles.counterContainer}>
              <Text style={styles.counterTitle}>
                Question {questionCounter}/{total}
              </Text>
              {question.description &&
                question.description !== 'no-description' && (
                  <TouchableOpacity
                    touchSoundDisabled
                    style={styles.readParagraphBtn}
                    onPress={() => setDirection(question.description)}>
                    <Text style={styles.readParagraphText}>Directions</Text>
                  </TouchableOpacity>
                )}
            </View>
            <Text>
              {isHtml(question.question) ? (
                <RenderHtml
                  contentWidth={screenWidth}
                  source={{html: question.question}}
                  tagsStyles={tagsStylesQuestion}
                />
              ) : (
                <Text style={styles.questionText}>{question.question}</Text>
              )}
            </Text>
          </View>

          <ScrollView
            style={styles.choiceContainer}
            contentContainerStyle={styles.choiceContainerContent}
            showsVerticalScrollIndicator={false}>
            {/* <View style={styles.questionImageContainer}>
              <Image
                style={styles.questionImage}
                source={require('../../assets/Images/home/s2.png')}
                resizeMode="cover"
              />
            </View> */}
            {Choice.map((letter: string, index: number) => (
              <QuestionChoice
                key={letter + 'letter' + index}
                choiceLetter={letter}
                choiceText={question[letter]}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                showFullPage={showFullPage}
                answer={question.answer}
                isPracticeMode={isPracticeMode}
                setUserAnswers={setUserAnswers ? setUserAnswers : null}
                questionData={
                  isReview
                    ? {
                        id: question.id,
                        index: --questionCounter,
                        selectedAnswer: question.selectedAnswer,
                        correctAnswer: question.correctAnswer,
                      }
                    : {id: question.id, index: --questionCounter}
                }
                isReview={isReview}
                userAnswers={userAnswers}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const QuestionChoice: React.FC<{
  choiceLetter: string;
  choiceText: string;
  selectedAnswer: string | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>;
  showFullPage: boolean;
  answer: string;
  isPracticeMode: boolean;
  setUserAnswers: React.Dispatch<
    React.SetStateAction<answersType[] | null>
  > | null;
  questionData: {
    id: string;
    index: number;
    selectedAnswer?: string;
    correctAnswer?: string;
  };
  isReview?: boolean;
  userAnswers: answersType[] | null;
}> = ({
  choiceLetter,
  choiceText,
  selectedAnswer,
  setSelectedAnswer,
  showFullPage,
  answer,
  isPracticeMode,
  setUserAnswers,
  questionData,
  isReview,
  userAnswers,
}) => {
  const checkIsAnswer = () => {
    if (userAnswers && userAnswers.length > 0) {
      const answer = userAnswers.find(
        answerItem => answerItem.id === questionData.id,
      );
      answer && setSelectedAnswer(answer.userAnswer);
    }
  };

  useEffect(() => {
    checkIsAnswer();
  }, []);

  const handleSelect = () => {
    if (!isReview && setUserAnswers) {
      if (isPracticeMode && selectedAnswer) return;

      if (selectedAnswer === choiceLetter) {
        setSelectedAnswer(null);

        setUserAnswers(prev => {
          if (prev) {
            return prev.filter(item => item.id !== questionData.id);
          } else {
            return null;
          }
        });

        return;
      }

      setSelectedAnswer(choiceLetter);
      setUserAnswers(prev => {
        if (prev) {
          return [
            ...prev.filter(item => item.id !== questionData.id),
            {
              id: questionData.id,
              index: questionData.index,
              userAnswer: choiceLetter,
              correctAnswer: answer,
            },
          ];
        } else {
          return [
            {
              id: questionData.id,
              index: questionData.index,
              userAnswer: choiceLetter,
              correctAnswer: answer,
            },
          ];
        }
      });
    }
  };

  return (
    <TouchableOpacity
      touchSoundDisabled
      style={
        showFullPage
          ? [
              questionChoiceStyles.container,
              questionChoiceStyles.containerFullPage,
            ]
          : questionChoiceStyles.container
      }
      onPress={handleSelect}>
      <Text
        style={
          isPracticeMode
            ? choiceLetter === selectedAnswer
              ? selectedAnswer === answer
                ? [
                    questionChoiceStyles.choiceLetter,
                    questionChoiceStyles.choiceLetterSelected,
                    questionChoiceStyles.choiceLetterSelectedCorrect,
                  ]
                : [
                    questionChoiceStyles.choiceLetter,
                    questionChoiceStyles.choiceLetterSelected,
                    questionChoiceStyles.choiceLetterSelectedError,
                  ]
              : selectedAnswer && answer === choiceLetter
              ? [
                  questionChoiceStyles.choiceLetter,
                  questionChoiceStyles.choiceLetterSelected,
                  questionChoiceStyles.choiceLetterSelectedCorrect,
                ]
              : questionChoiceStyles.choiceLetter
            : isReview
            ? choiceLetter === answer
              ? [
                  questionChoiceStyles.choiceLetter,
                  questionChoiceStyles.choiceLetterSelected,
                  questionChoiceStyles.choiceLetterSelectedCorrect,
                ]
              : choiceLetter === questionData.selectedAnswer
              ? [
                  questionChoiceStyles.choiceLetter,
                  questionChoiceStyles.choiceLetterSelected,
                  questionChoiceStyles.choiceLetterSelectedError,
                ]
              : questionChoiceStyles.choiceLetter
            : choiceLetter === selectedAnswer
            ? [
                questionChoiceStyles.choiceLetter,
                questionChoiceStyles.choiceLetterSelected,
              ]
            : questionChoiceStyles.choiceLetter
        }>
        {choiceLetter}
      </Text>
      {/* <RenderHtml
        contentWidth={screenWidth}
        source={{html: choiceText}}
        tagsStyles={tagsStylesChoice}
      /> */}

      {isHtml(choiceText) ? (
        <RenderHtml
          contentWidth={screenWidth}
          source={{html: choiceText}}
          tagsStyles={tagsStylesChoice}
        />
      ) : (
        <Text style={styles.choiceText}>{choiceText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    flex: 1,
  },
  containerFullPage: {
    backgroundColor: '#fff',
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  questionContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  questionContainerFullpage: {
    borderWidth: 0,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  counterTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'PoppinsSemiBold',
  },
  questionText: {
    fontSize: 14.5,
    color: '#000',
    fontFamily: 'PoppinsRegular',
    lineHeight: 28,
    textAlign: 'left',
    width: screenWidth * 0.8,
  },
  choiceText: {
    fontSize: 14.5,
    color: '#000',
    fontFamily: 'PoppinsRegular',
    lineHeight: 28,
    textAlign: 'left',
    width: screenWidth * 0.65,
  },
  readParagraphBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F5A52D',
  },
  readParagraphText: {
    fontSize: 12,
    fontFamily: 'PoppinsSemiBold',
    color: '#F5A52D',
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingTop: 6,
    paddingBottom: 4,
  },
  questionImageContainer: {
    width: '80%',
    height: screenHeight * (3 / 10),
    alignSelf: 'center',
    marginBottom: 40,
  },
  questionImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  choiceContainer: {
    paddingTop: 25,
    flex: 1,
    marginHorizontal: 3,
  },
  choiceContainerContent: {
    flexGrow: 1,
    // paddingBottom: 35,
  },
  submitBtn: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    position: 'absolute',
    bottom: 80,
    right: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});

const questionChoiceStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  containerFullPage: {
    borderWidth: 0,
  },
  choiceLetter: {
    width: '9%',
    marginHorizontal: '3%',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    color: '#757575',
    borderWidth: 1,
    borderColor: '#757575',
    paddingTop: 3,
    borderRadius: 3,
  },
  choiceLetterSelected: {
    backgroundColor: '#1E90FF',
    fontFamily: 'PoppinsSemiBold',
    color: '#fff',
    borderWidth: 0,
  },
  choiceLetterSelectedCorrect: {
    backgroundColor: '#028A0F',
  },
  choiceLetterSelectedError: {
    backgroundColor: '#D03120',
  },
  choiceText: {
    width: '85%',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
    color: '#000',
    paddingHorizontal: 2,
    lineHeight: 22,
  },
});

// const paragraphStyle = StyleSheet.create({
//   container: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     paddingBottom: 15,
//   },
//   paragraphContainer: {
//     paddingTop: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: 'Montserrat-SemiBold',
//     color: 'black',
//   },
//   paraText: {
//     marginBottom: 10,
//     fontSize: 14,
//     fontFamily: 'Montserrat-Regular',
//     color: '#4d4d4d',
//     lineHeight: 23,
//   },
// });

export default memo(Question);
