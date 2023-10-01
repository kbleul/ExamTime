import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import SocialOptions from '../components/Organisms/SocialOptions';
import LoginForm from './components/Organisms/LoginForm';
import AuthNavigatorOption from '../components/Organisms/AuthNavigatorOption';
import LoginHeader from './components/Molecules/LoginHeader';

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
    height: '100%',
    backgroundColor: 'white',
  },
  subContainer: {
    height: '105%',
  },
});
