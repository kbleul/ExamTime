import React, {useEffect, useState} from 'react';

import AuthRoutes from './Auth';
import AppRoutes from './App';
import {UserData} from '../Realm';
import {AuthContext} from '../Realm/model';
import SplashScreen from '../screens/Shared/SplashScreen';
import {checkUserStatus} from './logic';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../reduxToolkit/Store';
import {useOnboardingContext} from '../context/onboarding';
import {useUserStatus} from '../context/userStatus';

const Routes = ({Stack}: any) => {
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const {userStatus, setUserStatus} = useUserStatus();
  const dispatch = useDispatch();

  const {setShowOnboarding} = useOnboardingContext();

  useEffect(() => {
    checkUserStatus(savedUserData, setUserStatus, setShowOnboarding, dispatch);
  }, []);

  //used as loading check
  if (userStatus === null) {
    // Render a loading state or fallback UI while waiting for the checkOnBoarding value
    return <SplashScreen />;
  }

  return <AppRoutes Stack={Stack} />;
};

export default Routes;
