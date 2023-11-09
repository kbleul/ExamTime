import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useResendCodeMutation,
  useVerifyCodeMutation,
} from '../../reduxToolkit/Services/auth';
import {seterProps} from '../../types';
import {handleVerfiyCode, resendOtp} from '../../screens/Auth/Signup/Logic';
import {OPTStyles, formSubHeaderStyles} from '../../screens/Auth/Signup/Styles';

const VerificationCodeForm: React.FC<seterProps> = ({
  setCurrentStep,
  setUnregisteredUser,
  unregisteredUser,
  isReset,
}) => {
  const navigator = useNavigation();
  const [verifyCode, {isLoading, isError, error}] = useVerifyCodeMutation();
  const [
    resendCode,
    {isLoading: isLoadingResend, isError: isErrorResend, error: errorResend},
  ] = useResendCodeMutation();

  const [OtpValues, setOtpValues] = useState(['', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [timer, setTimer] = useState(60);
  const [isResend, setISResend] = useState(false);

  // const [isCorrectCode, setIsCorrectCode] = useState(true);

  const isCorrectCode = useRef(true);
  const sentOtp = useRef('     ');

  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const checkIfFUll = (arr: string[]) => {
    const hasEmpty = arr.some((i: string) => i === '');

    const optValue =
      OtpValues[0] + OtpValues[1] + OtpValues[2] + OtpValues[3] + OtpValues[4];
    if (!hasEmpty && optValue !== sentOtp.current) {
      sentOtp.current = optValue;
      handleVerfiyCode(
        {
          userId: unregisteredUser ? unregisteredUser?.id : '',
          code: optValue,
          forgotPassword: isReset ? true : false,
        },
        isCorrectCode,
        verifyCode,
        navigator,
        setCurrentStep,
        unregisteredUser,
        setUnregisteredUser,
      );
    }
  };
  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (OtpValues[index] !== '') {
        setOtpValues(prevValues => {
          const updatedValues = [...prevValues];
          updatedValues[index] = '';
          return updatedValues;
        });
      } else if (index !== 0) {
        focusPreviousInput(index);
      }
    } else if (index < inputRefs.current.length && key.length === 1) {
      setOtpValues(prevValues => {
        const updatedValues = [...prevValues];
        updatedValues[index] = key;
        return updatedValues;
      });

      focusNextInput(index);
    }
  };
  checkIfFUll(OtpValues);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => --prev);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000);

    return () => clearInterval(interval);
  }, [isResend]);
  return (
    <View>
      <Text style={[formSubHeaderStyles.heading, styles.headerMain]}>
        OTP Verification
      </Text>
      <Text style={[formSubHeaderStyles.subHeading, styles.header]}>
        Enter the verification code we just sent on your Phone number{' '}
        <Text style={styles.phone}>{unregisteredUser?.phoneNumber}</Text>
      </Text>
      <View style={OPTStyles.inputContainer}>
        {inputRefs.current.map((ref, index) => (
          <TextInput
            key={index}
            style={
              isCorrectCode.current
                ? OPTStyles.input
                : [OPTStyles.input, OPTStyles.inputError]
            }
            ref={inputRef => (inputRefs.current[index] = inputRef)}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={text => {
              if (text.length === 1) {
                focusNextInput(index);
              }
            }}
            onKeyPress={({nativeEvent: {key}}) => {
              handleKeyPress(index, key);
            }}
            onTextInput={({nativeEvent: {text}}) => {
              if (text.length === 1) {
                handleKeyPress(index, text);
              }
            }}
            value={OtpValues[index]}
          />
        ))}
      </View>

      {(isLoading || isLoadingResend) && <ActivityIndicator />}
      {error && (
        <Text style={OPTStyles.erroerText}>{error?.data?.message}</Text>
      )}
      {errorResend && (
        <Text style={OPTStyles.erroerText}>{errorResend?.data?.message}</Text>
      )}

      {!isCorrectCode.current && (
        <Text style={OPTStyles.erroerText}>Incorred code</Text>
      )}
      <View style={styles.timerContainer}>
        {timer < 1 ? (
          <TouchableOpacity
            style={styles.resendButton}
            touchSoundDisabled
            onPress={() =>
              resendOtp(
                unregisteredUser ? unregisteredUser : null,
                setUnregisteredUser,
                resendCode,
                setOtpValues,
                setTimer,
                isCorrectCode,
                setISResend,
                navigator,
                sentOtp,
              )
            }>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timer}>{timer} seconds</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    color: '#4d4d4d',
    fontFamily: 'PoppinsSemiBold',
    fontSize: 24,
  },
  header: {
    marginHorizontal: 4,
    color: '#4d4d4d',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  phone: {
    color: '#008E97',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  timer: {
    marginTop: 40,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: 'black',
  },
  resendButton: {
    marginTop: 40,
  },
  resendText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#008E97',
  },
});

export default VerificationCodeForm;
