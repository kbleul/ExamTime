import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {OPTStyles, formSubHeaderStyles} from '../../Styles';
import {seterProps} from '../../Types';
import {StyleSheet} from 'react-native';

const VerificationCodeForm: React.FC<seterProps> = ({
  setCurrentStep,
  setUser,
  user,
}) => {
  const [OtpValues, setOtpValues] = useState(['', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [timer, setTimer] = useState(60);
  // const [isCorrectCode, setIsCorrectCode] = useState(true);

  const isCorrectCode = useRef(true);

  const checkCode = (code: string) => {
    console.log(code, user?.verificationCode);
    if (user?.verificationCode?.toString() === code) {
      return true;
    } else {
      return false;
    }
  };

  const verifyUser = async () => {
    const parsedCode =
      OtpValues[0] + OtpValues[1] + OtpValues[2] + OtpValues[3] + OtpValues[4];

    if (checkCode(parsedCode)) {
      isCorrectCode.current = true;
      console.log('here');
      try {
        const url = `https://dev.think-hubet.com/user/verify/${user?.id}`;

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            verificationCode: parsedCode,
            forForgotPassword: false,
          }),
        });

        if (!response.ok) {
          console.log('not ok');
        }

        const responseData = await response.json();
        setCurrentStep(prev => ++prev);
        setUser(responseData.user);
        console.log('OTP:', responseData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      if (isCorrectCode.current) {
        isCorrectCode.current = false;
      }
    }
  };

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

    if (!hasEmpty) {
      verifyUser();
    }
  };
  const handleKeyPress = (index: number, key: string) => {
    //&& index > 0 && OtpValues[index] === ''

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
  }, []);

  return (
    <View>
      <Text style={[formSubHeaderStyles.heading, styles.header]}>
        OTP Verification
      </Text>
      <Text style={[formSubHeaderStyles.subHeading, styles.header]}>
        Enter the verification code we just sent on your Phone number{' '}
        <Text style={styles.phone}>{user?.phoneNumber}</Text>
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
            value={OtpValues[index]}
          />
        ))}
      </View>

      {!isCorrectCode.current && (
        <Text style={OPTStyles.erroerText}>Incorred code</Text>
      )}
      <View style={styles.timerContainer}>
        {timer < 1 ? (
          <TouchableOpacity style={styles.resendButton} touchSoundDisabled>
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
  header: {
    marginHorizontal: 6,
  },
  phone: {
    color: '#008E97',
    fontFamily: 'Montserrat-Regular',
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
