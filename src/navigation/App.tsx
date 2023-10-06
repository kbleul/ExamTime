import React, {useEffect, useState} from 'react';
import {StackType} from './types';
import Onboarding from '../screens/App/Onboarding/index';
import Home from '../screens/App/Home/index';
import Courses from '../screens/App/Courses/index';
import Profile from '../screens/App/Profile/index';
import ViewSubjectDetails from '../screens/App/Courses/components/Pages/ViewSubjectDetails';
import ViewCourseContent from '../screens/App/Courses/components/Pages/ViewCourseContent';
import ProfileEditIndex from '../screens/App/Profile/ProfileEditIndex';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import NetworkError from '../screens/Shared/NetworkError';

import {get_from_localStorage} from '../utils/Functions/Get/index';
import SplashScreen from '../screens/Shared/SplashScreen';
import {LocalStorageDataKeys, trialStatus} from '../utils/Data/data';
import {checkIsTrial} from '../screens/App/Onboarding/components/Logic';
import {StatusBar} from 'react-native';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import SignupCompleted from '../components/Organisms/SignupCompleted';

type getOnboardingReturnType = {
  status: boolean;
  value?: any;
};
const AppRoutes: React.FC<StackType> = ({Stack}) => {
  const [showOnboarding, setShowOnboarding] =
    useState<getOnboardingReturnType | null>(null);

  const [isTrialOver, setIsTrialOver] = useState<boolean | null>(null);

  useEffect(() => {
    const check_onBoarding_and_trialMode = async () => {
      const onBoardingValue = await get_from_localStorage(
        LocalStorageDataKeys.onBoarding,
      );

      const tempTrial = await checkIsTrial();

      tempTrial === trialStatus.expired
        ? setIsTrialOver(true)
        : setIsTrialOver(false);

      setShowOnboarding(onBoardingValue);
    };

    check_onBoarding_and_trialMode();
  }, []);

  if (showOnboarding === null) {
    // Render a loading state or fallback UI while waiting for the checkOnBoarding value
    return (
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0066B2"
          translucent={true}
        />
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={true}
      />
      <Stack.Navigator>
        {!showOnboarding.status && (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="Home"
          component={isTrialOver ? Signup : Home}
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
          name="Profile"
          component={Profile}
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
      </Stack.Navigator>
    </>
  );
};

export default AppRoutes;
