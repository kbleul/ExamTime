import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Practice from '../../screens/App/Practice';
import PracticeQuestion from '../../screens/App/PracticeQuestion';
import ExamReview from '../../screens/App/PracticeQuestion/ExamReview';
import ExamResult from '../../screens/App/PracticeQuestion/ExamResult';
import ViewAssessment from '../../screens/App/Study/ViewAssessment';
import Login from '../../screens/Auth/Login/Login';
import ForgotPassword from '../../screens/Auth/Login/ForgotPassword';
import NetworkError from '../../screens/Shared/NetworkError';
import SignupCompleted from '../../components/Organisms/SignupCompleted';
import Signup from '../../screens/Auth/Signup/Signup';
import SetNewPasswordPage from '../../screens/Auth/SetNewPassword';
import RandomQuestionsView from '../../screens/App/PracticeQuestion/RandomQuestionsView';

const PracticeStackScreens = () => {
  const StudyStack = createStackNavigator();

  return (
    <StudyStack.Navigator>
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
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="signup-success"
        component={SignupCompleted}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Password-Reset"
        component={SetNewPasswordPage}
        options={{headerShown: false}}
      />
    </StudyStack.Navigator>
  );
};

export default PracticeStackScreens;
