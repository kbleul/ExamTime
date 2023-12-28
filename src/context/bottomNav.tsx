import React from 'react';

import {useContext, createContext, useState} from 'react';

type NavItemType = {
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavContext = createContext<NavItemType | any>(undefined);

export function useNavContext() {
  return useContext(NavContext);
}

const NavProvider = ({children}: {children: React.ReactNode}) => {
  const [showNavigation, setShowNavigation] = useState(true);

  return (
    <NavContext.Provider
      value={
        {
          showNavigation,
          setShowNavigation,
        } as NavItemType
      }>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
