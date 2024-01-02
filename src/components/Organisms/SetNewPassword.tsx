import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {CreatePasswordFormDataType, userType} from '../../types';
import {
  useChangePasswordMutation,
  useCreatePasswordMutation,
} from '../../reduxToolkit/Services/auth';
import {
  formStyles,
  formSubHeaderStyles,
} from '../../screens/Auth/Signup/Styles';
import {
  changeUserPassword,
  createNewPassword,
} from '../../screens/Auth/Signup/Logic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenHeight} from '../../utils/Data/data';
import {RootState} from '../../reduxToolkit/Store';
import {useSelector} from 'react-redux';

const SetNewPassword: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  unregisteredUser: userType | null;
  isReset?: boolean;
}> = ({setCurrentStep, unregisteredUser, isReset}) => {
  const navigator = useNavigation();
  const [createPassword, {isLoading, isError, error}] =
    useCreatePasswordMutation();

  const [changePassword, {error: errorChange}] = useChangePasswordMutation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const IsDefaultPasswordChanged = useSelector(
    (state: RootState) => state.auth.IsDefaultPasswordChanged,
  );

  const schema = yup.object().shape({
    currentPassword: IsDefaultPasswordChanged
      ? yup.string()
      : yup
          .string()
          .required('Current Password is required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#.*\[\]+<>/',~`-])[A-Za-z\d@$!%*?&()#.*\[\]+<>/',~`-]{8,}$/,
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one of the following special characters: @$!%*?&()#.*[]+<>/',~`-",
          )
          .max(31, 'Password can not be more than 32 characters long'),
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
        {!IsDefaultPasswordChanged && (
          <View style={formStyles.inputContainer}>
            <Text style={formStyles.label}>Current Password</Text>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[formStyles.input, styles.bigBox]}
                    onChangeText={onChange}
                    secureTextEntry={!showCurrentPassword}
                    placeholder="**************"
                  />
                  {!showCurrentPassword ? (
                    <TouchableOpacity
                      style={styles.smallBox}
                      touchSoundDisabled
                      onPress={() => setShowCurrentPassword(true)}>
                      <Ionicons name="eye-outline" size={24} color="#858585" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.smallBox}
                      touchSoundDisabled
                      onPress={() => setShowCurrentPassword(false)}>
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="#858585"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              name="currentPassword"
            />
          </View>
        )}

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

          <Text style={formStyles.error}>{error?.data?.message}</Text>
          {errorChange && (
            <Text style={formStyles.error}>{errorChange?.data?.message}</Text>
          )}

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
          onPress={handleSubmit(data => {
            IsDefaultPasswordChanged
              ? createNewPassword(
                  {
                    userId: unregisteredUser ? unregisteredUser.id : '',
                    password: data.password,
                    forForgotPassword: isReset ? true : false,
                  },
                  createPassword,
                  navigator,
                  setCurrentStep,
                )
              : changeUserPassword(
                  {
                    token: token || '',
                    currentPassword: data.currentPassword,
                    newPassword: data.password,
                  },
                  changePassword,
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

        <TouchableOpacity
          touchSoundDisabled
          style={styles.backBtn}
          onPress={() => navigator.navigate('Login')}>
          <AntDesign name="arrowleft" color="black" size={22} />
          <Text style={styles.backBtnText}>
            back to <Text style={styles.backBtnTextBold}>Login</Text>
          </Text>
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
    overflow: 'hidden',
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
    overflow: 'hidden',
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
  backBtn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.1,
  },
  backBtnText: {
    fontFamily: 'PoppinsRegular',
    color: '#4F4F4F',
    marginLeft: 8,
  },
  backBtnTextBold: {
    fontFamily: 'PoppinsSemiBold',
    color: '#1E90FF',
    marginLeft: 8,
  },
});

export default SetNewPassword;
