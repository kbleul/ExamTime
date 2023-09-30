import React, {useState} from 'react';
import SignupFrom from '../Organisms/SignupFrom';
import SetNewPassword from '../Organisms/SetNewPassword';
import OtpVerfication from '../Organisms/OtpVerfication';
import {userType} from '../../Types';

const ContentDispatcher: React.FC<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({currentStep, setCurrentStep}) => {
  const [user, setUser] = useState<userType | null>(null);

  switch (currentStep) {
    case 1:
      return <SignupFrom setCurrentStep={setCurrentStep} setUser={setUser} />;

    case 2:
      return (
        <OtpVerfication
          setCurrentStep={setCurrentStep}
          setUser={setUser}
          user={user}
        />
      );

    case 3:
      return <SetNewPassword user={user} />;

    default:
      return <></>;
  }
};

export default ContentDispatcher;
