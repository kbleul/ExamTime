import React, {useEffect, useState} from 'react';

import AuthRoutes from './Auth';
import AppRoutes from './App';
import {UserData} from '../Realm';
import {AuthContext} from '../Realm/model';
import {StatusBar} from 'react-native';
import SplashScreen from '../screens/Shared/SplashScreen';
import {checkUserStatus} from './logic';
import {useDispatch} from 'react-redux';

const Routes = ({Stack}: any) => {
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  const dispatch = useDispatch();

  const [isAuthRoute, setIsAuthRoute] = useState<boolean | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    checkUserStatus(savedUserData, setIsAuthRoute, setShowOnboarding, dispatch);
  }, []);

  //used as loading check
  if (isAuthRoute === null) {
    // Render a loading state or fallback UI while waiting for the checkOnBoarding value
    return (
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#F9FCFF"
          translucent={true}
        />
        <SplashScreen />
      </>
    );
  }

  return isAuthRoute === true ? (
    <AuthRoutes Stack={Stack} />
  ) : (
    <AppRoutes Stack={Stack} showOnboarding={showOnboarding} />
  );
};

export default Routes;
