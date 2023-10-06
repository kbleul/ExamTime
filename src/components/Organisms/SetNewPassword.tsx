import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {CreatePasswordFormDataType, userType} from '../../types';
import {useCreatePasswordMutation} from '../../reduxToolkit/Services/auth';
import {
  formStyles,
  formSubHeaderStyles,
} from '../../screens/Auth/Signup/Styles';
import {createNewPassword} from '../../screens/Auth/Signup/Logic';

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
  unregisteredUser: userType | null;
  isReset?: boolean;
}> = ({setCurrentStep, unregisteredUser, isReset}) => {
  const navigator = useNavigation();
  const [createPassword, {isLoading, isError, error}] =
    useCreatePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreatePasswordFormDataType>({
    resolver: yupResolver(schema),
  });

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

        <Text style={formStyles.error}>{error?.data?.message}</Text>

        <TouchableOpacity
          style={[formStyles.submitBtn, formStyles.submitBtnPassword]}
          touchSoundDisabled
          onPress={handleSubmit(data => {
            createNewPassword(
              {
                userId: unregisteredUser ? unregisteredUser.id : '',
                password: data.password,
                forForgotPassword: isReset ? true : false,
              },
              createPassword,
              navigator,
              setCurrentStep,
            );
          })}
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
