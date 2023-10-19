import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxToolkit/Store';
import { get_from_localStorage } from '../../utils/Functions/Get';
import { useChangeProfileMutation } from '../../reduxToolkit/Services/auth';
import { loginSuccess } from '../../reduxToolkit/Features/auth/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyComponent from './a';
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
  const [updateProfile, { isLoading }] = useChangeProfileMutation(); 
  
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
        dispatch(
          loginSuccess({
            user: result.data.user,
            token: token,
          }),
        )
        console.log("updated result", result);
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View  style={{
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

        <View style={styles.topFormContainer}>
          <Text style={styles.title}>Update password</Text>

          <TextInput
            style={styles.inputContiner}
            onChangeText={setPassword}
            value={password}
            placeholder="Current password"
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="New password"
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={setConfirmNewPassword}
            value={confirmNewPassword}
            placeholder="Confirm password"
          />

          <TouchableOpacity
            style={[styles.inputContiner, styles.changePassword]}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
});
export default ProfileEdit;
