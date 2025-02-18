import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {View} from 'react-native';
import {Formik} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../reduxToolkit/Store';
import {
  useChangePasswordMutation,
  useChangeProfileMutation,
  useLoginMutation,
  useChangeProfilePictureMutation,
} from '../../reduxToolkit/Services/auth';
import {loginSuccess} from '../../reduxToolkit/Features/auth/authSlice';

import Toast from 'react-native-toast-message';
import {ScaledSheet, ms} from 'react-native-size-matters';
import {useGetRegionsMutation} from '../../reduxToolkit/Services/region';
import {useGetGradeMutation} from '../../reduxToolkit/Services/grade';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {updateRealmUserData} from '../../screens/Auth/Login/Logic';
import {AuthContext} from '../../Realm/model';
import {UserData} from '../../Realm';
import {useNavigation} from '@react-navigation/native';
import {passwordSchema} from '../../utils/Functions/Helper/PasswordSchema';
import {regionItemsType} from '../../types';
import TextHeading from '../Atoms/TextHeading';
import NameInput from '../Molecules/NameInput';
import PhoneInputWithPrefix from '../Molecules/PhoneInputWithPrefix';
import DropdownForRegionField, {
  dropDownStyle,
} from '../Molecules/DropdownForRegionField';
import BackButton from '../Atoms/BackButton';
import DoneButton from '../Atoms/DoneButton';
import PasswordField from '../Molecules/PasswordField';
import ChangePasswordButton from '../Atoms/ChangePasswordButton';
import {screenWidth} from '../../utils/Data/data';
import Config from 'react-native-config';
import {Dropdown} from 'react-native-element-dropdown';
import {genderOptions} from './SignupFrom';

const ProfileEdit = ({avatar}: {avatar: string | null}) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const {useRealm, useQuery, useObject} = AuthContext;

  const IsDefaultPasswordChanged = useSelector(
    (state: RootState) => state.auth.IsDefaultPasswordChanged,
  );

  const isSubscribed = useSelector(
    (state: RootState) => state.auth.isSubscribed,
  );

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
  const [showPassword, setShowPassword] = useState(true);
  const [changeProfile, {isLoading: isLoadingProfile}] =
    useChangeProfileMutation();
  const [changeProfilePicture, {isLoading: isLoadingPicture}] =
    useChangeProfilePictureMutation();
  const [updatePassword, {isLoading: isLoaingChangePassword}] =
    useChangePasswordMutation();
  const [getGrade] = useGetGradeMutation();
  const [isFocusRegion, setIsFocusRegion] = useState(false);
  const [region, setRegion] = useState<string | null>(
    user?.region?.region || null,
  );

  const [gender, setGender] = useState<string | null>(
    user?.gender ? (user?.gender === 'MALE' ? 'Male' : 'Female') : null,
  );
  const [isFocusGender, setIsFocusGender] = useState(false);

  const [regionError, setRegionError] = useState<string | null>(null);
  const [regionsListItems, setRegionsListItems] = useState<
    regionItemsType[] | []
  >([]);
  const [refetchRegions, setRefetchRegions] = useState(false);
  const [getRegions, {isLoading: isLoadingRegions}] = useGetRegionsMutation();
  type GetRegionsMutationFn = ReturnType<typeof useLoginMutation>[5];

  const handleUpdateProfile = async () => {
    if (token) {
      const profileData = {
        firstName: fullName.split(' ')[0],
        lastName:
          fullName.split(' ').length === 1
            ? '-'
            : fullName.split(' ')[fullName.split(' ').length - 1],
        phoneNumber: phone,
        grade: grade,
        gender: gender ? (gender === 'Male' ? 'MALE' : 'FEMALE') : '',
        region: region,
      };

      try {
        if (avatar) {
          const profileUpdateResult: any = await changeProfilePicture({
            token,
            avatar,
          });

          if (profileUpdateResult?.data && user) {
            const newUser = {
              ...user,
              profilePicture: profileUpdateResult.data.profilePicture,
            };

            dispatch(
              loginSuccess({
                user: newUser,
                token: token,
                isSubscribed: isSubscribed,
                IsDefaultPasswordChanged: IsDefaultPasswordChanged,
              }),
            );

            updateRealmUserData(newUserData, {...newUser}, token, realm);
          }

          Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'Profile image updated successfuly',
            visibilityTime: 3000,
          });

          if (profileUpdateResult.error) {
            Toast.show({
              type: 'error',
              text1: 'Error uploading profile picture!',
              text2: `${profileUpdateResult.error}`,
              visibilityTime: 4000,
            });
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error uploading profile picture',
          text2: `${error}`,
          visibilityTime: 4000,
        });
      }

      try {
        const result = await changeProfile({token, profileData});
        if (result?.data && result.data.user && user) {
          Toast.show({
            type: 'success',
            text1: 'success',
            text2: 'Profile updated successfuly',
            visibilityTime: 4000,
          });
          dispatch(
            loginSuccess({
              user: {
                ...result.data.user,
                profilePicture:
                  `${Config.API_URL}profile-pictures/` +
                  result.data.user.profilePicture,
              },
              token: token,
              isSubscribed: isSubscribed,
              IsDefaultPasswordChanged: IsDefaultPasswordChanged,
            }),
          );

          updateRealmUserData(
            newUserData,
            avatar
              ? {
                  ...result.data.user,
                  profilePicture:
                    `${Config.API_URL}profile-pictures/` + user.profilePicture,
                }
              : {...result.data.user},
            token,
            realm,
          );
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error updating profile data!',
            visibilityTime: 4000,
          });
        }

        setTimeout(() => navigation.navigate('Profile'), 1000);
        setFullName('');
        setPhone('');
        setGrade('');
      } catch (error) {
        console.log('Error updating profile infromation! ====> ', error);
        Toast.show({
          type: 'error',
          text1: 'Error updating profile infromation!',
          text2: `${error}`,
          visibilityTime: 4000,
        });
      }
    } else {
    }
  };
  //password schema
  const schema = passwordSchema;

  const handleSubmitPassword = async (values: {
    newPassword: string;
    confirmPassword: string;
    password: string;
  }) => {
    try {
      const userToken = token ? token : '';
      const response = await updatePassword({
        currentPassword: values.password,
        newPassword: values.newPassword,
        token: userToken,
      });
      if (response.error) {
        Toast.show({
          type: 'error',
          text1: 'Error updating password! Please try again.',
          text2: response.error.data.message,
          visibilityTime: 4000,
        });

        return;
      }

      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'Password updated successfuly',
        visibilityTime: 4000,
      });
      setTimeout(() => navigation.navigate('Profile'), 4000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: `${error}`,
        visibilityTime: 4000,
      });
    }
  };

  const fetchRegions = async (
    getRegions: GetRegionsMutationFn,
    setRegionsListItems: React.Dispatch<
      React.SetStateAction<regionItemsType[] | []>
    >,
  ) => {
    try {
      const response = await getRegions().unwrap();
      const tempRegionsList: regionItemsType[] = [];

      response.map((region: {region: string}) => {
        tempRegionsList.push({
          label: region.region,
          value: region.region,
        });
      });

      setRegionsListItems([...tempRegionsList]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRegions(getRegions, setRegionsListItems, navigation);
  }, [getRegions, refetchRegions, navigation]);

  useEffect(() => {
    const fetchGradeData = async () => {
      try {
        const response = await getGrade();
        // const fetchedGrade = data;
        const tempRegionsList: {label: string}[] = [];
        response.data.map((grade: {grade: string}) => {
          return tempRegionsList.push(grade.grade);
        });

        if (grade) return setGrade(tempRegionsList[0]);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchGradeData(); // Call the fetch function
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* back Icon and DoneTExt Container */}
          <View style={styles.backIconandDoneTExtContainer}>
            <BackButton onPress={handleGoBack} />
            <DoneButton
              onPress={handleUpdateProfile}
              isLoading={isLoadingProfile || isLoadingPicture}
            />
          </View>
          {/* Profile Update Forms */}
          <View style={styles.topFormContainer}>
            <TextHeading text="My profile" />

            <NameInput fullName={fullName} setFullName={setFullName} />

            <PhoneInputWithPrefix
              prefix="+251"
              onChangeText={setPhone}
              value={phone.replace('+251', '')}
            />

            <DropdownForRegionField
              regionsListItems={regionsListItems}
              isFocusRegion={isFocusRegion}
              region={region ? region : ''}
              setIsFocusRegion={setIsFocusRegion}
              setRegion={setRegion}
              isLoadingRegions={isLoadingRegions}
              regionError={regionError}
            />

            <View style={dropDownStyle.container}>
              <Dropdown
                style={dropDownStyle.dropdown}
                placeholderStyle={dropDownStyle.placeholderStyle}
                selectedTextStyle={dropDownStyle.selectedTextStyle}
                inputSearchStyle={dropDownStyle.inputSearchStyle}
                itemTextStyle={dropDownStyle.itemListStyle}
                iconStyle={dropDownStyle.iconStyle}
                data={genderOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusGender ? 'Select gender' : '...'}
                searchPlaceholder="Search..."
                value={gender}
                onFocus={() => setIsFocusGender(true)}
                onBlur={() => setIsFocusGender(false)}
                onChange={item => {
                  setGender(item.value);
                  setIsFocusGender(false);
                }}
              />
            </View>
          </View>

          <Formik
            initialValues={{password: '', newPassword: '', confirmPassword: ''}}
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
                  <View style={styles.iconContainerForPasswordHeader}>
                    <FontAwesome5
                      name="exclamation"
                      size={ms(12)}
                      style={{transform: [{rotate: '180deg'}], color: 'white'}}
                    />
                  </View>
                </View>

                <PasswordField
                  label="Old Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Old password"
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>* {errors.password}</Text>
                )}

                <PasswordField
                  label="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder="New password"
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.errorText}>* {errors.newPassword}</Text>
                )}

                <PasswordField
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm password"
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>
                    * {errors.confirmPassword}
                  </Text>
                )}

                <ChangePasswordButton
                  onPress={handleSubmit}
                  isLoading={isLoaingChangePassword}
                />
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
    marginHorizontal: '15@s',
    marginTop: '10@vs',
    flex: 1,
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  changePasswordButton: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
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
    fontFamily: 'PoppinsRegular',
    flexDirection: 'row',
    marginHorizontal: '20@s',
    marginVertical: '3@vs',
    paddingHorizontal: '20@s',
  },
  container: {
    backgroundColor: '#fff',
    height: '75%',
    overflow: 'hidden',
    paddingBottom: '25@vs',
    position: 'absolute',
    top: '25%',
    width: '100%',
  },
  dropdown: {
    width: '100%',
    height: '42@vs',
    textTransform: 'uppercase',
    color: '#d4d4d4',
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
    flex: 1,
    fontSize: screenWidth * 0.033,
    color: '#f08273',
    paddingLeft: 30,
    paddingRight: 20,
  },
  iconContainer: {
    color: 'black',
  },
  iconContainerForPasswordHeader: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: '50@s',
    overflow: 'hidden',
    height: '20@ms',
    justifyContent: 'center',
    marginRight: '15@s',
    width: '20@ms',
  },
  inputContainer: {
    color: '#9E9E9E',
    flex: 1,
    fontSize: '12@ms',
    paddingVertical: '10@vs',
  },
  inputContiner: {
    backgroundColor: 'white',
    borderColor: '#abcef5',
    borderWidth: 1,
    borderRadius: '10@s',
    overflow: 'hidden',
    color: '#858585',
    fontSize: '12@ms',
    marginHorizontal: '20@s',
    marginVertical: '5@vs',
    paddingHorizontal: '20@s',
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
    fontSize: '16@ms',
    paddingHorizontal: '10@s',
  },
  topFormContainer: {
    borderRadius: 10,
    paddingVertical: '1@vs',
    overflow: 'hidden',
  },

  //dropdown input field
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#d4d4d4',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#d4d4d4',
  },
  itemListStyle: {
    color: '#000',
  },
  submitBtnContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    width: 200,
    paddingVertical: 11,
    overflow: 'hidden',
  },
  submitBtnPassword: {
    backgroundColor: '#1E90FF',
    borderRadius: '10@ms',
    width: '200@vs',
    paddingVertical: '10@vs',
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
  submitText: {
    color: '#FFFFFF',
    fontFamily: 'PoppinsSemiBold',
    fontSize: '18@ms',
    textAlign: 'right',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: '14@ms',
    fontFamily: 'PoppinsRegular',
    color: '#b3b3b3',
  },
});
export default ProfileEdit;
