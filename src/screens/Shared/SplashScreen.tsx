import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient colors={['#1E90FF', '#0066B2']} style={styles.container}>
      <Image source={require('../../assets/Logo/logo.png')} />
      <ActivityIndicator size={24} color="#fff" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SplashScreen;
