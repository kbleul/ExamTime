import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={24} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SplashScreen;
