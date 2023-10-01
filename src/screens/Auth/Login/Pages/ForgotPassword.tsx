import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LoginHeader from '../components/Molecules/LoginHeader';
import {useNavigation} from '@react-navigation/native';
import ForgotPasswordForm from '../components/Organisms/ForgotPasswordForm';
import VerificationCodeForm from '../../Signup/components/Organisms/OtpVerfication';
import {userType} from '../../Signup/Types';
import SetNewPassword from '../../Signup/components/Organisms/SetNewPassword';

const ForgotPassword = () => {
  const navigator = useNavigation();
  const [stepCounter, setStepCounter] = useState(1);
  const [user, setUser] = useState<userType | null>(null);

  return (
    <View style={styles.contianer}>
      <LoginHeader navigate={() => navigator.navigate('Login')} />
      {stepCounter === 1 && (
        <ForgotPasswordForm setStepCounter={setStepCounter} setUser={setUser} />
      )}

      {stepCounter === 2 && (
        <VerificationCodeForm
          setCurrentStep={setStepCounter}
          setUser={setUser}
          user={user}
        />
      )}

      {stepCounter === 3 && (
        <SetNewPassword
          setCurrentStep={setStepCounter}
          user={user}
          isReset={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
});
export default ForgotPassword;
