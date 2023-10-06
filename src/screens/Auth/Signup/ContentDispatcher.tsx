import React, {useState} from 'react';
import SetNewPassword from '../../../components/Organisms/SetNewPassword';
import OtpVerfication from '../../../components/Organisms/OtpVerfication';
import SignupFrom from '../../../components/Organisms/SignupFrom';
import {userType} from '../../../types';

const ContentDispatcher: React.FC<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({currentStep, setCurrentStep}) => {
  const [unregisteredUser, setUnregisteredUser] = useState<userType | null>(
    null,
  );

  switch (currentStep) {
    case 1:
      return (
        <SignupFrom
          setCurrentStep={setCurrentStep}
          setUnregisteredUser={setUnregisteredUser}
        />
      );

    case 2:
      return (
        <OtpVerfication
          setCurrentStep={setCurrentStep}
          setUnregisteredUser={setUnregisteredUser}
          unregisteredUser={unregisteredUser}
        />
      );

    case 3:
      return (
        <SetNewPassword
          setCurrentStep={setCurrentStep}
          unregisteredUser={unregisteredUser}
        />
      );

    default:
      return <></>;
  }
};

export default ContentDispatcher;
