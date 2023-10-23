import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LoginHeader from '../../../components/Molecules/LoginHeader';
import LoginForm from '../../../components/Organisms/LoginForm';
import SocialOptions from '../../../components/Organisms/SocialOptions';
import AuthNavigatorOption from '../../../components/Organisms/AuthNavigatorOption';
import {screenHeight} from '../../../utils/Data/data';

export default function Login() {
  const navigator = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <LoginHeader navigate={() => navigator.goBack()} />
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
    marginBottom: (screenHeight * 1) / 9,
  },
});
