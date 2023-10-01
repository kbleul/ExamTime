import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {formStyles} from '../../../Signup/Styles';
import {useNavigation} from '@react-navigation/native';
import {
  setObject_to_localStorage,
  set_to_localStorage,
} from '../../../../../utils/Functions/Set';
import {LocalStorageDataKeys} from '../../../../../utils/Data/data';

type FormData = {
  phoneNumber: string;
  password: string;
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
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
    ),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigation();
  const [showPassword, setShowPassword] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<boolean | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const url = `https://dev.think-hubet.com/user/login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: '+251' + data.phoneNumber,
          password: data.password,
        }),
      });
      console.log(data.password, data.phoneNumber);
      if (!response.ok) {
        const responseData = await response.json();
        console.log('object', responseData);
        throw new Error('User login failed');
      }

      const responseData = await response.json();
      console.log('object2', responseData);

      setIsLoading(false);
      setLoginError(null);

      set_to_localStorage(
        LocalStorageDataKeys.token,
        responseData?.accessToken,
      );

      setObject_to_localStorage(
        LocalStorageDataKeys.userData,
        responseData?.user,
      );

      navigator.navigate('Home');
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

      setLoginError(error?.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.signinText}>Sign in</Text>
      {loginError && (
        <Text style={[formStyles.error, styles.error]}>{loginError} !</Text>
      )}
      <View>
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
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.bigBox}
                onChangeText={onChange}
                placeholder="*********"
                placeholderTextColor={'#d4d4d4'}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <TouchableOpacity
                  style={styles.smallBox}
                  touchSoundDisabled
                  onPress={() => setShowPassword(false)}>
                  <Ionicons name="eye-outline" size={28} color="#81afe6" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.smallBox}
                  touchSoundDisabled
                  onPress={() => setShowPassword(true)}>
                  <Ionicons name="eye-off-outline" size={28} color="#81afe6" />
                </TouchableOpacity>
              )}
            </View>
          )}
          name="password"
        />
        {errors.password ? (
          <Text style={formStyles.error}>{errors.password.message} *</Text>
        ) : (
          <Text style={formStyles.error}>{''}</Text>
        )}
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity touchSoundDisabled style={styles.rememberMeContainer}>
          <Feather name="square" size={18} />
          <Text style={styles.remembermeText}>remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          touchSoundDisabled
          onPress={() => {
            navigator.navigate('forgot-password');
          }}>
          <Text style={styles.forgorPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity touchSoundDisabled style={styles.submitContainer}>
        {isLoading ? (
          <ActivityIndicator color={'#FFF'} />
        ) : (
          <Text style={styles.submitBtnText} onPress={handleSubmit(onSubmit)}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
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
  inputContainerSecondary: {
    paddingHorizontal: 10,
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
  bigBoxSecondary: {
    paddingLeft: 30,
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  remembermeText: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
    fontSize: 14,
    color: '#858585',
  },
  forgorPasswordText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#0066B2',
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
  },
});
export default LoginForm;
