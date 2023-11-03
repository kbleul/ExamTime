import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {answersType} from '.';

const ExamResult = ({route}) => {
  const {userAnswers, total} = route.params;
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    userAnswers.forEach((answer: answersType) => {
      answer.userAnswer === answer.correctAnswer &&
        setCorrectAnswers(prev => ++prev);
    });
  }, []);

  return (
    <View>
      <Text>WELCOME TO EXAM RESULTS PAGE ...</Text>
      <Text>COMMING SOOM.</Text>

      <Text>Total {total}</Text>
      <Text>Skipped {total - userAnswers.length}</Text>
      <Text>Correct {correctAnswers}</Text>
      <Text>Incorrect {userAnswers.length - correctAnswers}</Text>
    </View>
  );
};

export default ExamResult;
