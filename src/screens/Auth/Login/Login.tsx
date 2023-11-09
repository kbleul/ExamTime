import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LoginHeader from '../../../components/Molecules/LoginHeader';
import LoginForm from '../../../components/Organisms/LoginForm';
import AuthNavigatorOption from '../../../components/Organisms/AuthNavigatorOption';
import {screenHeight} from '../../../utils/Data/data';
import {calculateDateDifference} from '../../App/Onboarding/Logic';
import {AuthContext} from '../../../Realm/model';
import {UserData} from '../../../Realm';

export default function Login() {
  const navigator = useNavigation<any>();
<<<<<<< HEAD

=======
  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);
  const dateDiff = calculateDateDifference(savedUserData[0].initialDate);
>>>>>>> dev
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          dateDiff >= 3
            ? [styles.subContainer, styles.subContainerSecondary]
            : styles.subContainer
        }>
        <LoginHeader navigate={() => navigator.goBack()} />

        {dateDiff >= 3 && (
          <Text style={styles.note}>
            Your trial period is over. You must login or signup inorder to keep
            using this app.
          </Text>
        )}
        <LoginForm />
        {/* <SocialOptions /> */}
      </View>

      <AuthNavigatorOption
        headingText="Don’t have an account?"
        buttonText="Create one now"
        onPress={() => navigator.navigate('Signup')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    paddingTop: 30,
  },
  subContainer: {
    borderBottomWidth: 1,
    borderColor: '#B5C3E5',
    paddingBottom: 38,
    marginHorizontal: 15,
    marginBottom: screenHeight / 9,
  },
  subContainerSecondary: {
    marginBottom: 15,
  },
  note: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: 'black',
    borderWidth: 1,
    paddingVertical: 4,
    borderColor: '#E1E1E1',
    borderRadius: 10,
  },
});
