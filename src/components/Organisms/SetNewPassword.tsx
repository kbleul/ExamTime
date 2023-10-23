import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#.*\[\]+<>/',~`-])[A-Za-z\d@$!%*?&()#.*\[\]+<>/',~`-]{8,}$/,
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one of the following special characters: @$!%*?&()#.*[]+<>/',~`-",
    )
    .max(31, 'Password can not be more than 32 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .max(31, 'Password can not be more than 32 characters long'),
});

const SetNewPassword: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  unregisteredUser: userType | null;
  isReset?: boolean;
}> = ({setCurrentStep, unregisteredUser, isReset}) => {
  const navigator = useNavigation();
  const [createPassword, {isLoading, isError, error}] =
    useCreatePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreatePasswordFormDataType>({
    resolver: yupResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={[formStyles.input, styles.bigBox]}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  placeholder="**************"
                />
                {!showPassword ? (
                  <TouchableOpacity
                    style={styles.smallBox}
                    touchSoundDisabled
                    onPress={() => setShowPassword(true)}>
                    <Ionicons name="eye-outline" size={24} color="#858585" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.smallBox}
                    touchSoundDisabled
                    onPress={() => setShowPassword(false)}>
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color="#858585"
                    />
                  </TouchableOpacity>
                )}
              </View>
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={[formStyles.input, styles.bigBox]}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="**************"
                />
                {!showConfirmPassword ? (
                  <TouchableOpacity
                    style={styles.smallBox}
                    touchSoundDisabled
                    onPress={() => setShowConfirmPassword(true)}>
                    <Ionicons name="eye-outline" size={24} color="#858585" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.smallBox}
                    touchSoundDisabled
                    onPress={() => setShowConfirmPassword(false)}>
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color="#858585"
                    />
                  </TouchableOpacity>
                )}
              </View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#81afe6',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 4,
  },
  bigBox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'PoppinsRegular',
    color: '#4D4D4D',
    paddingHorizontal: 20,
    borderRadius: 0,
    borderWidth: 0,
    borderRightWidth: 1,
  },
  smallBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#b3b3b3',
  },
});

export default SetNewPassword;
