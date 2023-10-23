import {Dispatch} from 'react';
import {UserData} from '../Realm';
import {loginSuccess} from '../reduxToolkit/Features/auth/authSlice';
import {calculateDateDifference} from '../screens/App/Onboarding/Logic';
import {AnyAction} from '@reduxjs/toolkit';

export const checkUserStatus = (
  savedUserData: UserData[],
  setIsAuthRoute: React.Dispatch<React.SetStateAction<boolean | null>>,
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
    if (!savedUserData[0].user && !savedUserData[0].isSubscribed) {
      // realm.write(() => {
      //   realm.delete(savedUserData[0]);
      // });

      const dateDiff = calculateDateDifference(savedUserData[0].initialDate);
      if (dateDiff > 3) {
        //trial is over
        setIsAuthRoute(true);
        return;
      }
    }

    if (savedUserData[0].user && savedUserData[0].token) {
      dispatch(
        loginSuccess({
          user: {...savedUserData[0].user},
          token: savedUserData[0].token,
          isSubscribed: savedUserData[0].isSubscribed,
        }),
      );
    }
  }

  setIsAuthRoute(false);
};
