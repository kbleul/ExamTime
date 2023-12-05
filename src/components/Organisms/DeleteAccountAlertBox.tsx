import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {loginSuccess} from '../../reduxToolkit/Features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteUserAccount, verifyPassword} from '../../utils/Functions/Helper';
import {AuthContext} from '../../Realm/model';
import {UserData} from '../../Realm';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootState} from '../../reduxToolkit/Store';
import {formStyles} from '../../screens/Auth/Signup/Styles';
import {
  useDeleteAccountMutation,
  useLoginMutation,
} from '../../reduxToolkit/Services/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../utils/Data/data';

export type FormDataType = {
  password: string;
};
const DeleteAccountAlertBox: React.FC<{
  setShowLDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({setShowLDeleteDialog}) => {
  const navigator = useNavigation();
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();

  const [deleteAccount, {isLoading, isError, error}] =
    useDeleteAccountMutation();

  const {useQuery, useRealm} = AuthContext;
  const realm = useRealm();
  const savedUserData = useQuery(UserData);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showLastPrompt, setShowLastPrompt] = useState(false);
  const [userPassword, setUserPassword] = useState('');

  return (
    <View
      style={
        showPasswordForm || showLastPrompt
          ? [styles.container, styles.containerPasswordForm]
          : styles.container
      }>
      {!showPasswordForm && !showLastPrompt && (
        <>
          <Text style={styles.mainText}>
            Are you sure you want to delete your account ?
          </Text>
          <Text style={[styles.mainSubText, styles.mainSubText]}>
            This will remove all your profile information, and you will not be
            able to get it back !
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              touchSoundDisabled
              onPress={() => setShowPasswordForm(true)}>
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              touchSoundDisabled
              onPress={() => setShowLDeleteDialog(false)}>
              <Text style={styles.buttonText}>Cancle</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {showPasswordForm && (
        <PasswordForm
          setShowLastPrompt={setShowLastPrompt}
          setShowPasswordForm={setShowPasswordForm}
          setUserPassword={setUserPassword}
        />
      )}

      {showLastPrompt && (
        <>
          <AntDesign
            name="deleteuser"
            color="#000"
            size={60}
            style={styles.deleteIcon}
          />
          <Text style={styles.mainText}>This action is permanent !</Text>

          {error && (
            <Text style={formStyles.error}>{error?.data?.message} *</Text>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              touchSoundDisabled
              onPress={() =>
                DeleteUserAccount(
                  userPassword,
                  token || '',
                  dispatch,
                  deleteAccount,
                  navigator,
                  setShowLastPrompt,
                  setShowLDeleteDialog,
                  realm,
                  savedUserData,
                  Toast,
                )
              }>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                  Delete
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              touchSoundDisabled
              onPress={() => setShowLDeleteDialog(false)}>
              <Text style={styles.buttonText}>Cancle</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()#.*\[\]+<>/',~`-])[A-Za-z\d@$!%*?&()#.*\[\]+<>/',~`-]{8,}$/,
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one of the following special characters: @$!%*?&()#.*[]+<>/',~`-",
    )
    .max(31, 'Password can not be more than 32 characters long'),
});

const PasswordForm = ({
  setShowLastPrompt,
  setShowPasswordForm,
  setUserPassword,
}: {
  setShowLastPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
  });
  const navigator = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);
  const IsDefaultPasswordChanged = useSelector(
    (state: RootState) => state.auth.IsDefaultPasswordChanged,
  );

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(true);
  const [login, {isLoading, isError, error}] = useLoginMutation();

  return (
    <View>
      <Text style={styles.mainText}>Enter your password</Text>
      <Text style={[styles.mainSubText, styles.mainSubText]}>
        This action is irreversable
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <View style={LoginFormstyles.inputContainer}>
              <TextInput
                style={LoginFormstyles.bigBox}
                onChangeText={onChange}
                placeholder="Password"
                placeholderTextColor={'#000'}
                secureTextEntry={showPassword}
              />
              {showPassword ? (
                <TouchableOpacity
                  style={LoginFormstyles.smallBox}
                  touchSoundDisabled
                  onPress={() => setShowPassword(false)}>
                  <Ionicons name="eye-outline" size={24} color="#000" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={LoginFormstyles.smallBox}
                  touchSoundDisabled
                  onPress={() => setShowPassword(true)}>
                  <Ionicons name="eye-off-outline" size={24} color="#000" />
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
        {error && (
          <Text style={formStyles.error}>{error?.data?.message} *</Text>
        )}
      </KeyboardAvoidingView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          touchSoundDisabled
          onPress={handleSubmit(data =>
            verifyPassword(
              {...data, phoneNumber: user?.phoneNumber || ''},
              dispatch,
              login,
              loginSuccess,
              navigator,
              setShowLastPrompt,
              setShowPasswordForm,
              setUserPassword,
              IsDefaultPasswordChanged,
            ),
          )}>
          {isLoading ? (
            <ActivityIndicator color={'#FFF'} />
          ) : (
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Verify Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 125,
    zIndex: 100,
    backgroundColor: '#AED1F3',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  containerPasswordForm: {
    height: 300,
  },
  mainText: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
    color: 'black',
    fontSize: screenWidth * 0.04,
    paddingHorizontal: 5,
  },
  mainSubText: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.035,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: 'white',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.035,
    color: 'black',
    textAlign: 'center',
  },
  buttonTextSecondary: {
    fontFamily: 'Montserrat-Regular',
    fontSize: screenWidth * 0.035,
    color: 'white',
  },
  deleteIcon: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

const LoginFormstyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
  },
  smallBox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth * 0.03,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsRegular',
  },
  inputPhone: {
    borderWidth: 0,
    borderRadius: 0,
    overflow: 'hidden',
    color: '#000',
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#81afe6',
  },
  bigBox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: screenWidth * 0.03,
    fontFamily: 'PoppinsRegular',
    color: '#000',
    paddingHorizontal: 20,
    letterSpacing: 2,
  },
  bigBoxSecondary: {
    paddingLeft: 30,
  },
});
export default DeleteAccountAlertBox;
