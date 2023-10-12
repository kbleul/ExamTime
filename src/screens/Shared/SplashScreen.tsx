import React from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import logo from '../../assets/Logo/logoWhite.jpg';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ActivityIndicator size={24} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
export default SplashScreen;
