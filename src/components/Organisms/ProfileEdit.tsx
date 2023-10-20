import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxToolkit/Store';
import { get_from_localStorage } from '../../utils/Functions/Get';
import { useChangePasswordMutation, useChangeProfileMutation } from '../../reduxToolkit/Services/auth'
import { loginSuccess } from '../../reduxToolkit/Features/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
interface User {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  grade?: {
    grade: string;
  };
  region?: {
    region: string;
  };
}
const ProfileEdit: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState(user.firstName ?? '');
  const [lname, setLame] = useState(user.lastName ?? '');
  const [phone, setPhone] = useState(user.phoneNumber ?? '');
  const [grade, setGrade] = useState(user.grade?.grade ?? '');
  const [city, setCity] = useState(user.region?.region ?? '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [updateProfile, { isLoading }] = useChangeProfileMutation();
  const [updatePassword, ] = useChangePasswordMutation();

  const gradeOptions = ['grade_12_natural', 'grade_12_social'];
  const handleUpIconPress = () => {
    const currentIndex = gradeOptions.indexOf(grade);
    const newIndex = (currentIndex + 1) % gradeOptions.length;
    setGrade(gradeOptions[newIndex]);
  };

  const handleDownIconPress = () => {
    const currentIndex = gradeOptions.indexOf(grade);
    const newIndex = (currentIndex - 1 + gradeOptions.length) % gradeOptions.length;
    setGrade(gradeOptions[newIndex]);

  };

  const handleUpdateProfile = async () => {
    const tokenResult = await get_from_localStorage('token');
    if (tokenResult.status && tokenResult.value) {
      const token = tokenResult.value;

      const profileData = {
        firstName: name,
        lastName: lname,
        phoneNumber: phone,
        grade: grade,
        gender: "MALE",
        region: city,
      };

      try {
        const result = await updateProfile({ token, profileData });
        if(result.data.user)
        {
     await dispatch(
          loginSuccess({
            user: result.data.user,
            token: token,
          }),
        )
        }
        console.log("updated result", result);
      
      await  Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'Profile updated successfuly',
          visibilityTime:4000
        });
        navigation.goBack();
      } catch (error) {
        await  Toast.show({
          type: 'error',
          text1: 'Hello',
          text2: 'Something wrong'
        });
        console.error(error);
      }
    }
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
      ),
    newPassword: yup
      .string()
      .required('New password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'New password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character',
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  });
  const handleSubmit = async (values) => {

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
            await  Toast.show({
              type: 'success',
              text1: 'success',
              text2: 'Password updated successfuly',
              visibilityTime:4000
            });
            // Handle the response accordingly
            console.log('Password changed successfully', response)
            console.log('Password changed successfully');
          }
        } catch (error) {
          await  Toast.show({
            type: 'error',
            text1: 'Hello',
            text2: 'Something went wrong'
          });
          console.error(error);
        }

      } 
    } 
  return (
    <>
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* <TouchableOpacity
            style={styles.iconContainer}
            touchSoundDisabled
            onPress={() => navigator.goBack()}>
            <AntDesign name="left" style={styles.backIcon} size={24} />
          </TouchableOpacity> */}

        <TouchableOpacity style={styles.doneContainer} onPress={handleUpdateProfile}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        <View style={styles.topFormContainer}>
          <Text style={styles.title}>My profile</Text>

          <TextInput
            style={styles.inputContiner}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={setLame}
            value={lname}
          />
          {/* <TextInput
            style={styles.inputContiner}
            onChangeText={setPhone}
            value={phone}
            autoComplete="tel"
          /> */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30,
            borderWidth: 1,
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 10,
            borderColor: '#abcef5',
          }}>
            <Text style={styles.prefixText}>+251</Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={setPhone}
              value={phone.replace('+251', '')}
              autoComplete="tel"
            />
          </View>
          <View style={{
            flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30,
            borderWidth: 1,
            marginVertical: 5,
            marginHorizontal: 20,
            borderRadius: 10,
            borderColor: '#abcef5',
          }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                color: '#858585'
              }}
              value={grade}
              onChangeText={setGrade}
            />
            <View style={{ flexDirection: 'columen', gap: 5 }}>
              <TouchableOpacity onPress={handleUpIconPress}>
                <Icon name="arrow-up" size={15} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDownIconPress}>
                <Icon name="arrow-down" size={15} />
              </TouchableOpacity>
            </View>
          </View>



          <TextInput
            style={styles.inputContiner}
            onChangeText={setCity}
            value={city}
          />
        </View>
        <Formik
          initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.topFormContainer}>
              <Text style={styles.title}>Update password</Text>

              <View style={{
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30,
                borderWidth: 1,
                marginVertical: 5,
                marginHorizontal: 20,
                borderRadius: 10,
                borderColor: '#abcef5',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Current password"
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
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}


              <View style={{
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30,
                borderWidth: 1,
                marginVertical: 5,
                marginHorizontal: 20,
                borderRadius: 10,
                borderColor: '#abcef5',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                  }}
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
                    <Ionicons name="eye-off-outline" size={28} color="#81afe6" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.newPassword && touched.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              <View style={{
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30,
                borderWidth: 1,
                marginVertical: 5,
                marginHorizontal: 20,
                borderRadius: 10,
                borderColor: '#abcef5',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                  }}
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
                    <Ionicons name="eye-off-outline" size={28} color="#81afe6" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={[styles.inputContainer, styles.changePassword]}
                onPress={handleSubmit}
              >
                <Text style={styles.changePasswordText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
  
      </ScrollView>
 
    </View>
    <Toast/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '35%',
    height: '67%',
    width: '100%',
    backgroundColor: '#F9FCFF',
    overflow: 'hidden',
    paddingBottom: 25,
  },
  doneContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
  },
  doneText: {
    color: '#1E90FF',
    fontSize: 20,
  },
  topFormContainer: {
    width: '94%',
    marginLeft: '3%',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    color: '#858585',
    fontSize: 22,
    paddingHorizontal: 18,
  },
  inputContiner: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: '#abcef5',
    fontSize: 18,
    color: '#858585',
  },
  changePassword: {
    backgroundColor: '#1E90FF',
  },
  changePasswordText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  prefixContainer: {
    position: 'absolute',
    top: '35%',
    height: '67%',
    width: '100%',
    // backgroundColor: '#F9FCFF',
    overflow: 'hidden',
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',

  },
  prefixText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    fontSize: 18,
    color: '#858585',
    flex: 1,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    flex: 1,
  },
  smallBox: {
    // width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#b3b3b3',
  },
 
});
export default ProfileEdit;
