import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {formStyles} from '../../screens/Auth/Signup/Styles';
import {userType} from '../../types';

type FormData = {
  phoneNumber: string;
};

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('phone-number-start', 'Phone number must start with 7 or 9', value =>
      /^[79]/.test(value),
    )
    .test(
      'phone-number-isNumber',
      'Invalid phone number digits',
      function (value) {
        const restOfDigits = value.substring(1);
        return /^\d+$/.test(restOfDigits);
      },
    )
    .test(
      'phone-number-length',
      'Phone number must be 9 digits long',
      value => value?.length === 9,
    ),
});

const ForgotPasswordForm: React.FC<{
  setStepCounter: React.Dispatch<React.SetStateAction<number>>;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}> = ({setStepCounter, setUser}) => {
  const navigator = useNavigation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const url = `${Config.API_URL}user/forgotpassword`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `+251${data.phoneNumber}`,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Send code failed. Please try again ${data.phoneNumber}`,
        );
      }

      const responseData = await response.json();
      setIsLoading(false);
      setSubmitError(null);
      setUser(responseData.user);
      setStepCounter(prev => ++prev);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error submitting form:', error);
      if (
        error instanceof TypeError &&
        (error.message === 'Network request failed' ||
          error.message === 'AbortError')
      ) {
        navigator.navigate('network-error');
        return;
      }

      setSubmitError(error?.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.signinText}>
        We will send you a verification code to your phone number
      </Text>

      {submitError && (
        <Text style={[formStyles.error, styles.error]}>{submitError} !</Text>
      )}

      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <View style={styles.inputContainer}>
            <Text style={styles.smallBox}>+251</Text>
            <TextInput
              keyboardType="numeric"
              style={[styles.bigBox, styles.inputPhone]}
              onChangeText={onChange}
              placeholder="*********"
              placeholderTextColor={'#d4d4d4'}
            />
          </View>
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber ? (
        <Text style={formStyles.error}>{errors.phoneNumber.message} *</Text>
      ) : (
        <Text style={formStyles.error}>{''}</Text>
      )}

      <TouchableOpacity touchSoundDisabled style={styles.submitContainer}>
        {isLoading ? (
          <ActivityIndicator color={'#FFF'} />
        ) : (
          <Text style={styles.submitBtnText} onPress={handleSubmit(onSubmit)}>
            Send
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: '20%',
  },
  signinText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#4D4D4D',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    borderColor: '#81afe6',
    borderWidth: 1,
    borderRadius: 10,
  },
  smallBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#b3b3b3',
  },
  inputPhone: {
    letterSpacing: 6,
    borderWidth: 0,
    borderRadius: 0,
    color: '#000',
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#81afe6',
  },
  bigBox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: '#4D4D4D',
    paddingHorizontal: 20,
    letterSpacing: 2,
  },
  submitContainer: {
    paddingVertical: 12,
    width: '100%',
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#1E90FF',
  },
  submitBtnText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
export default ForgotPasswordForm;
