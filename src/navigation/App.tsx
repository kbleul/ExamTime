import React from 'react';
import Onboarding from '../screens/App/Onboarding/index';
import Home from '../screens/App/Home/index';
import Courses from '../screens/App/Courses/index';
import Profile from '../screens/App/Profile/index';
import Aboutus from '../screens/App/Aboutus/index';
import SubscriptionPlan from '../screens/App/SubscriptionPlan/index';
import StudySection from '../screens/App/Study/index';
import ChallengeSection from '../screens/App/Challenge/index';
import ProfileEditIndex from '../screens/App/Profile/ProfileEditIndex';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import NetworkError from '../screens/Shared/NetworkError';
import ContactUs from '../screens/App/ContactUs/index';
import FAQ from '../screens/App/FAQ/index';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import SignupCompleted from '../components/Organisms/SignupCompleted';
import ViewSubjectDetails from '../screens/App/Courses/ViewSubjectDetails';
import ViewCourseContent from '../screens/App/Courses/ViewCourseContent';
import Practice from '../screens/App/Practice/index';
import PracticeQuestion from '../screens/App/PracticeQuestion';
import {ProfileMenuItemsAuth} from '../utils/Data/data';
import SetNewPasswordPage from '../screens/Auth/SetNewPassword';
import ExamReview from '../screens/App/PracticeQuestion/ExamReview';
import ExamResult from '../screens/App/PracticeQuestion/ExamResult';
import RandomQuestionsView from '../screens/App/PracticeQuestion/RandomQuestionsView';
import UserGuide from '../screens/App/UserGuide';
import StudyDetails from '../screens/App/Study/StudyDetails';
import ViewPdf from '../screens/App/Study/ViewPdf';
import ViewVideo from '../screens/App/Study/ViewVideo';
import ViewAssessment from '../screens/App/Study/ViewAssessment';
import History from '../screens/App/History';
import Notification from '../screens/App/Notification';
import NotificationProvider from '../context/notification';
const AppRoutes: React.FC<{Stack: any; showOnboarding: boolean}> = ({
  Stack,
  showOnboarding,
}) => {
  return (
    <NotificationProvider>
      <Stack.Navigator>
        {showOnboarding && (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
        )}

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="View-Course"
          component={ViewSubjectDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="View-Course-Content"
          component={ViewCourseContent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Practice"
          component={Practice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exam-View"
          component={PracticeQuestion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Random-Exam"
          component={RandomQuestionsView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exam-Review"
          component={ExamReview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exam-Result"
          component={ExamResult}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="StudySection"
          component={StudySection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudyDetails"
          component={StudyDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewPdf"
          component={ViewPdf}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewVideo"
          component={ViewVideo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewAssessment"
          component={ViewAssessment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChallengeScreen"
          component={ChallengeSection}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileMenuItemsAuth['Contact Us'].navigate}
          component={ContactUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileMenuItemsAuth['FAQ'].navigate}
          component={FAQ}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ProfileMenuItemsAuth['User Guide'].navigate}
          component={UserGuide}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile-Edit"
          component={ProfileEditIndex}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="forgot-password"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="network-error"
          component={NetworkError}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup-success"
          component={SignupCompleted}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Aboutus"
          component={Aboutus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubscriptionPlan"
          component={SubscriptionPlan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password-Reset"
          component={SetNewPasswordPage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NotificationProvider>
  );
};

export default AppRoutes;
