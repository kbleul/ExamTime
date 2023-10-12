import React, {useEffect, useState} from 'react';
import {
  RealmProvider,
  createRealmContext,
  useQuery,
  useRealm,
} from '@realm/react';
import AuthRoutes from './Auth';
import AppRoutes from './App';
import StackType from './StackType';
import {useSelector} from 'react-redux';
import {RootState} from '../reduxToolkit/Store';
import {UserData} from '../Realm';
import {userType} from '../types';
import {AuthContext} from '../Realm/model';
import {StatusBar} from 'react-native';
import SplashScreen from '../screens/Shared/SplashScreen';

const Routes = ({Stack}: StackType) => {
  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();

  const [isAuthRoute, setIsAuthRoute] = useState<boolean | null>(null);

  // Create a realm context
  // const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);
  const savedUserData = useQuery(UserData);
  console.log(savedUserData[0].selectedSubjects);
  useEffect(() => {
    if (savedUserData.length === 0) {
      setIsAuthRoute(false);
    } else {
      // realm.write(() => {
      //   realm.delete(savedUserData[0]);
      // });
    }
  }, []);
  /*
    check if realm is set

    if realm 
            check user.isSubscribed
                if(false) 
                  check user.startingdate
                    if < 0 then AuthRoutes
                    else AuthRoutes
                else AppRoutes
    else AppRoutes
    create real user

  */

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

  return isAuthRoute ? (
    <AuthRoutes Stack={Stack} />
  ) : (
    <AppRoutes Stack={Stack} />
  );
};

export default Routes;
