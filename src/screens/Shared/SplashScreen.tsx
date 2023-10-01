import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo/logo.png')} />
      <ActivityIndicator size={24} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SplashScreen;
