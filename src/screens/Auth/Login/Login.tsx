import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LoginHeader from '../../../components/Molecules/LoginHeader';
import LoginForm from '../../../components/Organisms/LoginForm';
import SocialOptions from '../../../components/Organisms/SocialOptions';
import AuthNavigatorOption from '../../../components/Organisms/AuthNavigatorOption';

export default function Login() {
  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <LoginHeader navigate={() => navigator.goBack()} />
        <LoginForm />
        <SocialOptions />

        <AuthNavigatorOption
          headingText="Don’t have an account?"
          buttonText="Create one now"
          onPress={() => navigator.navigate('Signup')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  subContainer: {
    height: '110%',
  },
});
