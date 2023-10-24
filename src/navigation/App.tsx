import React, {useEffect, useState} from 'react';
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

import {
  getObject_from_localStorage,
  get_from_localStorage,
} from '../utils/Functions/Get/index';
import SplashScreen from '../screens/Shared/SplashScreen';
import {LocalStorageDataKeys, trialStatus} from '../utils/Data/data';
import {checkIsTrial} from '../screens/App/Onboarding/Logic';
import {StatusBar} from 'react-native';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import SignupCompleted from '../components/Organisms/SignupCompleted';
import ViewSubjectDetails from '../screens/App/Courses/ViewSubjectDetails';
import ViewCourseContent from '../screens/App/Courses/ViewCourseContent';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../reduxToolkit/Features/auth/authSlice';

type getOnboardingReturnType = {
  status: boolean;
  value?: any;
};
const AppRoutes: React.FC<StackType> = ({Stack}) => {
  const dispatch = useDispatch();
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

      const savedUser = await getObject_from_localStorage(
        LocalStorageDataKeys.userData,
      );
      const savedToken = await get_from_localStorage(
        LocalStorageDataKeys.token,
      );

      savedUser.status &&
        savedToken.status &&
        dispatch(
          loginSuccess({
            user: {...savedUser.value},
            token: savedToken.value ? savedToken.value : '',
          }),
        );
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
        backgroundColor="#F9FCFF"
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
