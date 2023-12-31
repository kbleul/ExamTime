import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NetworkError from '../../screens/Shared/NetworkError';

import Practice from '../../screens/App/Practice';
import PracticeQuestion from '../../screens/App/PracticeQuestion';
import ExamReview from '../../screens/App/PracticeQuestion/ExamReview';
import ExamResult from '../../screens/App/PracticeQuestion/ExamResult';
import ViewAssessment from '../../screens/App/Study/ViewAssessment';
import RandomQuestionsView from '../../screens/App/PracticeQuestion/RandomQuestionsView';

const PracticeStackScreens = () => {
  const PracticeStack = createStackNavigator();

  return (
    <PracticeStack.Navigator>
      <PracticeStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />

      <PracticeStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <PracticeStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <PracticeStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <PracticeStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />

      <PracticeStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <PracticeStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
    </PracticeStack.Navigator>
  );
};

export default PracticeStackScreens;
