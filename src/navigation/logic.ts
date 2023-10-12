import {UserData} from '../Realm';
import {calculateDateDifference} from '../screens/App/Onboarding/Logic';

export const checkUserStatus = (
  savedUserData: ResultsType<UserData>,
  setIsAuthRoute: React.Dispatch<React.SetStateAction<boolean | null>>,
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
  if (savedUserData.length === 0) {
    setIsAuthRoute(false);
  } else if (!savedUserData[0].user && !savedUserData[0].isSubscribed) {
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
};
