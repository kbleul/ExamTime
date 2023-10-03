import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {formStyles, formSubHeaderStyles} from '../../Styles';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {userType} from '../../../../../Types';
import Config from 'react-native-config';

type FormData = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SetNewPassword: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  user: userType | null;
  isReset?: boolean;
}> = ({setCurrentStep, user, isReset}) => {
  const navigator = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  //1234Password%
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const url = `${Config.API_URL}user/createpassword/${user?.id}`; // Replace with your API endpoint

      const timeoutMs = 10000; // Set your desired timeout in milliseconds (e.g., 10 seconds)

      const controller = new AbortController();
      const signal = controller.signal;

      const timeout = setTimeout(() => {
        controller.abort(); // Abort the fetch request on timeout
      }, timeoutMs);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: data.password,
          forForgotPassword: isReset ? true : false,
        }),
        signal,
      });

      clearTimeout(timeout); // Clear the timeout since the request completed

      if (!response.ok) {
        throw new Error('Set password failed');
      }

      const responseData = await response.json();
      navigator.navigate('signup-success');
      setCurrentStep(1);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form:', error);
      if (
        error instanceof TypeError &&
        (error.message === 'Network request failed' ||
          error.message === 'AbortError')
      ) {
        navigator.navigate('network-error');
      }
    }
  };

  return (
    <View>
      <Text style={formSubHeaderStyles.heading}>Setup new Password</Text>
      <Text style={formSubHeaderStyles.subHeading}>
        must be at least 8 character!
      </Text>

      <View style={formStyles.container}>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Password</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                style={formStyles.input}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password ? (
            <Text style={formStyles.error}>* {errors.password.message}</Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Confirm Password</Text>
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <TextInput
                style={formStyles.input}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword ? (
            <Text style={formStyles.error}>
              * {errors.confirmPassword.message}
            </Text>
          ) : (
            <Text style={formStyles.error}>{''}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[formStyles.submitBtn, formStyles.submitBtnPassword]}
          touchSoundDisabled
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={'#FFF'} />
          ) : (
            <Text style={formStyles.submitText}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetNewPassword;
