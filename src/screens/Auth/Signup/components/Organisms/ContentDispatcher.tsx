import React from 'react';
import SignupFrom from './SignupFrom';
import SetNewPassword from './SetNewPassword';
import OtpVerfication from './OtpVerfication';

const ContentDispatcher: React.FC<{currentStep: number}> = ({currentStep}) => {
  switch (currentStep) {
    case 1:
      return <SignupFrom />;

    case 2:
      return <OtpVerfication />;

    case 3:
      return <SetNewPassword />;

    default:
      return <></>;
  }
};

export default ContentDispatcher;
