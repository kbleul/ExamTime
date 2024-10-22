import {Dispatch} from 'react';
import {UserData} from '../Realm';
import {loginSuccess} from '../reduxToolkit/Features/auth/authSlice';
import {calculateDateDifference} from '../screens/App/Onboarding/Logic';
import {AnyAction} from '@reduxjs/toolkit';
import {STATUSTYPES} from '../utils/Data/data';

export const checkUserStatus = (
  savedUserData: ResultsType<UserData>,
  setUserStatus: React.Dispatch<React.SetStateAction<string | null>>,
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>,
) => {
  /*
      check if realm is set
  
      if no realm instance exists
         show AppRoutes
            create new realm on onboarding
      else
              check if user exists and has subscribed
                  if(false) 
                    check user.startingdate
                      if > 3 then AuthRoutes
                      else AppRoutes - trial mode
    */
  if (savedUserData && savedUserData[0]) {
    setShowOnboarding(false);

    if (!savedUserData[0].user) {
      const dateDiff = calculateDateDifference(savedUserData[0].initialDate);

      if (dateDiff >= savedUserData[0].allowedTrialDays) {
        //trial is over
        setUserStatus(STATUSTYPES.NotAuthorized);
        return;
      }
    }

    if (savedUserData[0].user && savedUserData[0].token) {
      dispatch(
        loginSuccess({
          user: {
            ...savedUserData[0].user,
            region: {
              id: savedUserData[0].user?.region.id,
              region: savedUserData[0].user?.region.region,
            },
          },
          token: savedUserData[0].token,
          isSubscribed: savedUserData[0].isSubscribed,
          IsDefaultPasswordChanged: true,
        }),
      );

      if (savedUserData[0].isSubscribed) {
        setUserStatus(STATUSTYPES.Subscribed);
        return;
      }

      const createdAt = savedUserData[0].user.createdAt;

      const remainingDays = calculateDateDifference(createdAt);

      setUserStatus(
        savedUserData[0].allowedTrialDays_AfterLogin - remainingDays <= 0
          ? STATUSTYPES.Unsubscribed
          : STATUSTYPES.AuthorizedTrial,
      );

      return;
    }
  }

  setUserStatus(STATUSTYPES.Trial);
};
