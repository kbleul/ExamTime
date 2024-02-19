import React, {useEffect} from 'react';

import {useContext, createContext, useState} from 'react';
import {STATUSTYPES} from '../utils/Data/data';
import {calculateDateDifference} from '../screens/App/Onboarding/Logic';
import {useQuery} from '@realm/react';
import {UserData} from '../Realm';
import {AuthContext} from '../Realm/model';
import {useSelector} from 'react-redux';
import {RootState} from '../reduxToolkit/Store';

interface UserStatusType {
  userStatus: string | null;
  setUserStatus: React.Dispatch<React.SetStateAction<string | null>>;
}
interface UserStatusContextValue {
  userStatus: string | null;
  setUserStatus: React.Dispatch<React.SetStateAction<string | null>>;
}
const UserStatusContext = createContext<UserStatusType | any>(undefined);

export function useUserStatus() {
  return useContext(UserStatusContext);
}

const UserStatusProvider = ({children}: {children: React.ReactNode}) => {
  const [userStatus, setUserStatus] = useState<string | null>(
    STATUSTYPES.Trial,
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);

  useEffect(() => {
    if (!user && savedUserData && savedUserData.length > 0) {
      if (savedUserData[0].isSubscribed) {
        setUserStatus(STATUSTYPES.Subscribed);
        return;
      }
      const createdAt = savedUserData[0].initialDate;

      const remainingDays = calculateDateDifference(createdAt);
      savedUserData[0].allowedTrialDays - remainingDays <= 0 &&
        setUserStatus(STATUSTYPES.NotAuthorized);
    }
  }, []);

  return (
    <UserStatusContext.Provider
      value={
        {
          userStatus,
          setUserStatus,
        } as UserStatusContextValue
      }>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
