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

const Routes = ({Stack}: any) => {
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isAuthRoute, setIsAuthRoute] = useState<boolean | null>(null);
  const {setShowOnboarding} = useOnboardingContext();

  console.log('savedUserData', savedUserData.length);
  useEffect(() => {
    checkUserStatus(savedUserData, setIsAuthRoute, setShowOnboarding, dispatch);
  }, []);

  //used as loading check
  if (isAuthRoute === null) {
    // Render a loading state or fallback UI while waiting for the checkOnBoarding value
    return <SplashScreen />;
  }

  return isAuthRoute === true && !user ? (
    <AuthRoutes Stack={Stack} />
  ) : (
    <AppRoutes Stack={Stack} />
  );
};

export default Routes;
