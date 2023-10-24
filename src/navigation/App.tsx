import React from 'react';
import {StackType} from './types';
import Onboarding from '../screens/App/Onboarding/index';
import Home from '../screens/App/Home/index';
import Courses from '../screens/App/Courses/index';
import Profile from '../screens/App/Profile/index';
import Aboutus from '../screens/App/Aboutus/index';
import SubscriptionPlan from '../screens/App/SubscriptionPlan/index';
import ProfileEditIndex from '../screens/App/Profile/ProfileEditIndex';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import NetworkError from '../screens/Shared/NetworkError';
import ContactUs from '../screens/App/ContactUs/index';
import FAQ from '../screens/App/FAQ/index';

import {StatusBar} from 'react-native';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import SignupCompleted from '../components/Organisms/SignupCompleted';
import ViewSubjectDetails from '../screens/App/Courses/ViewSubjectDetails';
import ViewCourseContent from '../screens/App/Courses/ViewCourseContent';
import Practice from '../screens/App/Practice/index';
import PracticeQuestion from '../screens/App/PracticeQuestion';
import {ProfileMenuItemsAuth} from '../utils/Data/data';

const AppRoutes: React.FC<{Stack: StackType; showOnboarding: boolean}> = ({
  Stack,
  showOnboarding,
}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#F9FCFF"
        translucent={true}
      />
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
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
