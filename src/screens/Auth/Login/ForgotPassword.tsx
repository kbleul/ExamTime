import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginHeader from '../../../components/Molecules/LoginHeader';
import ForgotPasswordForm from '../../../components/Organisms/ForgotPasswordForm';
import {userType} from '../../../types';
import VerificationCodeForm from '../../../components/Organisms/OtpVerfication';
import SetNewPassword from '../../../components/Organisms/SetNewPassword';

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
          setUnregisteredUser={setUser}
          unregisteredUser={user}
        />
      )}

      {stepCounter === 3 && (
        <SetNewPassword
          setCurrentStep={setStepCounter}
          unregisteredUser={user}
          isReset={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F9FCFF',
  },
});
export default ForgotPassword;
