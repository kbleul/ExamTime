import React, {useEffect} from 'react';

import AppRoutes from './App';
import {UserData} from '../Realm';
import {AuthContext} from '../Realm/model';
import SplashScreen from '../screens/Shared/SplashScreen';
import {checkUserStatus} from './logic';
import {useDispatch} from 'react-redux';

import {useOnboardingContext} from '../context/onboarding';
import {useUserStatus} from '../context/userStatus';

const Routes = ({Stack}: any) => {
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const {userStatus, setUserStatus} = useUserStatus();
  const dispatch = useDispatch();

  const {showOnboarding, setShowOnboarding} = useOnboardingContext();

  useEffect(() => {
    checkUserStatus(savedUserData, setUserStatus, setShowOnboarding, dispatch);
  }, [showOnboarding]);

  //used as loading check
  if (userStatus === null) {
    // Render a loading state or fallback UI while waiting for the checkOnBoarding value
    return <SplashScreen />;
  }

  return <AppRoutes Stack={Stack} />;
};

export default Routes;
