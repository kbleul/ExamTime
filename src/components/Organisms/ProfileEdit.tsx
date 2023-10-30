import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxToolkit/Store';
import { get_from_localStorage } from '../../utils/Functions/Get';
import {
  useChangePasswordMutation,
  useChangeProfileMutation,
} from '../../reduxToolkit/Services/auth';
import { loginSuccess } from '../../reduxToolkit/Features/auth/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import { ScaledSheet, ms } from 'react-native-size-matters';
import { useGetRegionsMutation } from '../../reduxToolkit/Services/region';
import { useGetGradeMutation } from '../../reduxToolkit/Services/grade';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateRealmUserData } from '../../screens/Auth/Login/Logic';
import { AuthContext } from '../../Realm/model';
import { UserData } from '../../Realm';
import { useNavigation } from '@react-navigation/native';
import { passwordSchema } from '../../utils/Functions/Helper/PasswordSchema';

const ProfileEdit: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const { useRealm, useQuery, useObject } = AuthContext;

  const realm = useRealm();
  const savedUserData = useQuery(UserData);
  const newUserData = useObject(UserData, savedUserData[0]?._id);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [fullName, setFullName] = useState(
    (user?.firstName || '') + ' ' + (user?.lastName || ''),
  );
  const [phone, setPhone] = useState(user?.phoneNumber ?? '');
  const [grade, setGrade] = useState(user?.grade?.grade ?? '');
  const [city, setCity] = useState(user?.region?.region ?? '');
  const [showPassword, setShowPassword] = useState(true);
  const [changeProfile, { isLoading }] = useChangeProfileMutation();
  const [updatePassword] = useChangePasswordMutation();
  const [getRegions] = useGetRegionsMutation();
  const [getGrade] = useGetGradeMutation();
  const [rigionOptions, setRegionOptions] = useState([]);

  const handleUpIconPressforRigion = city => {
    const currentIndex = rigionOptions.findIndex(
      option => option.value === city,
    );
    const newIndex = (currentIndex + 1) % rigionOptions.length;
    setCity(rigionOptions[newIndex].value);
  };

  const handleDownIconPressforRigion = () => {
    const currentIndex = rigionOptions.findIndex(
      option => option.value === city,
    );
    const newIndex =
      (currentIndex - 1 + rigionOptions.length) % rigionOptions.length;
    setCity(rigionOptions[newIndex].value);
  };

  const handleUpdateProfile = async () => {
    if (token) {
      const [firstName, lastName] = fullName.split(' ');
      const profileData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        grade: grade,
        gender: user?.gender ?? '',
        region: city,
      };

      try {
        const result = await changeProfile({ token, profileData });
        console.log(result.error)
        if (result.data.user) {
          dispatch(
            loginSuccess({
              user: result.data.user,
              token: token,
            }),
          );
        }
        if (result.error) {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: `${result.error}`,
          })
        }
        else {
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: `${result.error}`,
          });
        }
        updateRealmUserData(newUserData, result.data.user, token, realm);

        Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'Profile updated successfuly',
          visibilityTime: 4000,
        });

        setTimeout(() => navigation.navigate('Profile'), 1000);
        // setName('')
        setFullName('');
        setPhone('');
        setGrade('');
        setCity('');
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: `${error}`,
        });
      }
    } else {
    }
  };
  //password schema
  const schema = passwordSchema

  const handleSubmitPassword = async values => {
    if (values.newPassword === values.confirmPassword) {
      try {
        const tokenResult = await get_from_localStorage('token');
        if (tokenResult.status && tokenResult.value) {
          const token = tokenResult.value;
          const response = await updatePassword({
            currentPassword: values.password,
            newPassword: values.newPassword,
            token,
          });

          await Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'Password updated successfuly',
            visibilityTime: 4000,
          });
        }
      } catch (error) {
        await Toast.show({
          type: 'error',
          text1: 'Hello',
          text2: 'Something went wrong',
        });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegions();
        const tempRegionsList: { label: string; value: string }[] = [];
        response.data.map((region: { region: string }) => {
          tempRegionsList.push({
            label: region.region.toUpperCase(),
            value: region.region,
          });
        });

        setRegionOptions([...tempRegionsList]);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    const fetchGradeData = async () => {
      try {
        const response = await getGrade();
        // const fetchedGrade = data;
        const tempRegionsList: { label: string }[] = [];
        response.data.map((grade: { grade: string }) => {
          return tempRegionsList.push(grade.grade);
        });

        if (grade) return setGrade(tempRegionsList[0]);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchData();
    fetchGradeData(); // Call the fetch function
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* back Icon and DoneTExt Container */}
          <View style={styles.backIconandDoneTExtContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              touchSoundDisabled
              onPress={() => navigation.goBack()}>
              <AntDesign name="left" style={styles.backIcon} size={ms(24)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneContainer}
              onPress={handleUpdateProfile}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Update Forms */}
          <View style={styles.topFormContainer}>
            <Text style={styles.title}>My profile</Text>
            <TextInput
              style={styles.inputContiner}
              onChangeText={setFullName}
              value={fullName}
            />
            <View style={styles.commonTextFeildStyle}>
              <Text style={styles.prefixText}>+251</Text>
              <TextInput
                style={styles.inputContainer}
                onChangeText={setPhone}
                value={phone.replace('+251', '')}
                autoComplete="tel"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.commonTextFeildStyle}>
              <TextInput
                style={styles.inputContainer}
                value={city}
                onChangeText={setCity}
              />
              <View>
                <TouchableOpacity onPress={handleUpIconPressforRigion}>
                  <Ionicons name="caret-up-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDownIconPressforRigion}>
                  <Ionicons name="caret-down-outline" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* password update  */}
          <Formik
            initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
            validationSchema={schema}
            onSubmit={handleSubmitPassword}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.topFormContainer}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.title}>Update password</Text>
                  <View
                    style={styles.iconContainerForPasswordHeader}>
                    <FontAwesome5
                      name="exclamation"
                      size={15}
                      style={{ transform: [{ rotate: '180deg' }], color: 'white' }}
                    />
                  </View>
                </View>

                <View style={styles.commonTextFeildStyle}>
                  <TextInput
                    style={styles.inputContainer}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="old password"
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
                      <Ionicons
                        name="eye-off-outline"
                        size={28}
                        color="#81afe6"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.commonTextFeildStyle}>
                  <TextInput
                    style={styles.inputContainer}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    placeholder="New password"
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
                      <Ionicons
                        name="eye-off-outline"
                        size={28}
                        color="#81afe6"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
                <View style={styles.commonTextFeildStyle}>
                  <TextInput
                    style={styles.inputContainer}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Confirm password"
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
                      <Ionicons
                        name="eye-off-outline"
                        size={28}
                        color="#81afe6"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.inputContainer,
                    styles.changePassword,
                    styles.changePasswordButton
                  ]}
                  onPress={handleSubmit}>
                  <Text style={styles.changePasswordText}>Change Password</Text>
                  <AntDesign name="right" style={styles.changepasswordButtonIcon}/>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
      <Toast />
    </>
  );
};

const styles = ScaledSheet.create({
  backIcon: {
    color: 'black',
    fontSize: '28@ms',
    fontWeight: 'bold',
  },
  backIconandDoneTExtContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10@s',
    flex: 1,
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  changePasswordButton: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: '40@ms',
    marginHorizontal: '20@ms',
  },
  changePasswordText: {
    color: '#fff',
    fontFamily: 'PoppinsRegular',
    fontSize: '18@ms',
    textAlign: 'center',
  },
  changepasswordButtonIcon: {
    color: 'white',
    fontSize: '18@ms',
  },
  commonTextFeildStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@ms',
    fontFamily: 'PoppinsRegular',
    flexDirection: 'row',
    marginHorizontal: '20@s',
    marginVertical: '2@vs',
    paddingHorizontal: '30@s',
  },
  container: {
    backgroundColor: '#F5F5F5',
    height: '75%',
    overflow: 'hidden',
    paddingBottom: '25@vs',
    position: 'absolute',
    top: '25%',
    width: '100%',
  },
  doneContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: '5@s',
    marginTop: '10@vs',
  },
  doneText: {
    color: '#1E90FF',
    fontFamily: 'PoppinsRegular',
    fontSize: '20@ms',
  },
  errorText: {
    color: 'red',
    flex: 1,
    fontSize: '15@ms',
  },
  iconContainer: {
    color: 'black',
  },
  iconContainerForPasswordHeader: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: '50@s',
    height: '25@ms',
    justifyContent: 'center',
    marginRight: '15@s',
    padding: '5@s',
    width: '25@ms',
  },
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '16@ms',
    paddingVertical: '10@vs',
  },
  inputContiner: {
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@s',
    color: '#858585',
    fontSize: '16@ms',
    marginHorizontal: '20@s',
    marginVertical: '5@vs',
    paddingHorizontal: '30@s',
    paddingVertical: '10@vs',
  },
  passwordHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10@s',
    marginTop: '10@vs',
  },
  prefixContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '67%',
    overflow: 'hidden',
    paddingBottom: '25@vs',
    position: 'absolute',
    top: '35%',
    width: '100%',
  },
  prefixText: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginRight: '5@s',
  },
  smallBox: {
    alignItems: 'center',
    color: '#b3b3b3',
    fontSize: '20@ms',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: '#858585',
    fontFamily: 'PoppinsRegular',
    fontSize: '18@ms',
    paddingHorizontal: '10@s',
  },
  topFormContainer: {
    borderRadius: 10,
    paddingVertical: '1@vs',
  },
});
export default ProfileEdit;
