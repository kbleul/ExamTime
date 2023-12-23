import React from 'react';

import {useContext, createContext, useState} from 'react';

type OnboardingItemType = {
  showOnboarding: boolean;
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
};

const OnboardingContext = createContext<OnboardingItemType | any>(undefined);

export function useOnboardingContext() {
  return useContext(OnboardingContext);
}

const OnboardingProvider = ({children}: {children: React.ReactNode}) => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <OnboardingContext.Provider
      value={
        {
          showOnboarding,
          setShowOnboarding,
        } as OnboardingItemType
      }>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
