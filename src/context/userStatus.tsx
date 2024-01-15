import React from 'react';

import {useContext, createContext, useState} from 'react';

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
  const [userStatus, setUserStatus] = useState<string | null>(null);

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
