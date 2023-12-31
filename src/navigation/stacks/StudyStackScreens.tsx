import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ViewAssessment from '../../screens/App/Study/ViewAssessment';
import ViewVideo from '../../screens/App/Study/ViewVideo';
import ViewPdf from '../../screens/App/Study/ViewPdf';
import StudyDetails from '../../screens/App/Study/StudyDetails';
import ExamResult from '../../screens/App/PracticeQuestion/ExamResult';
import ExamReview from '../../screens/App/PracticeQuestion/ExamReview';
import RandomQuestionsView from '../../screens/App/PracticeQuestion/RandomQuestionsView';
import PracticeQuestion from '../../screens/App/PracticeQuestion';
import Practice from '../../screens/App/Practice';
import StudySection from '../../screens/App/Study/index';
import ChallengeSection from '../../screens/App/Challenge/index';

const StudyStackScreens = () => {
  const StudyStack = createStackNavigator();
  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="StudySection"
        component={StudySection}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ChallengeScreen"
        component={ChallengeSection}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudyDetails"
        component={StudyDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />
    </StudyStack.Navigator>
  );
};

export default StudyStackScreens;
