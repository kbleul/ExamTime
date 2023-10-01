import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileEdit = () => {
  const [name, setName] = useState('Selam Kebede');
  const [phone, setPhone] = useState('+251987654321');
  const [grade, setGrade] = useState('Grade 6');
  const [city, setCity] = useState('Addis Ababa');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.doneContainer}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        {/* <View style={styles.topFormContainer}>
          <Text style={styles.title}>My profile</Text>

          <Text style={styles.inputContiner}>Selam Kebede</Text>
          <Text style={styles.inputContiner}>+251987654321</Text>
          <Text style={styles.inputContiner}>Grade 6</Text>
          <Text style={styles.inputContiner}>Addis Ababa</Text>
        </View> */}

        <View style={styles.topFormContainer}>
          <Text style={styles.title}>My profile</Text>

          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setName(e?.target?.value)}
            value={name}
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setPhone(e?.target?.value)}
            value={phone}
            autoComplete="tel"
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setGrade(e?.target?.value)}
            value={grade}
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setCity(e?.target?.value)}
            value={city}
          />
        </View>

        <View style={styles.topFormContainer}>
          <Text style={styles.title}>Update password</Text>

          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setPassword(e?.target?.value)}
            value={password}
            placeholder="Current password"
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setNewPassword(e?.target?.value)}
            value={newPassword}
            placeholder="New password"
          />
          <TextInput
            style={styles.inputContiner}
            onChangeText={(e: any) => setConfirmNewPassword(e?.target?.value)}
            value={confirmNewPassword}
            placeholder="Confirm password"
          />

          <TouchableOpacity
            style={[styles.inputContiner, styles.changePassword]}>
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
});
export default ProfileEdit;
