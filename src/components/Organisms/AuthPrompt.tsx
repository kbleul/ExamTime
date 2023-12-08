import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import {ImageBackground} from 'react-native';
const AuthPrompt = () => {
  const navigator = useNavigation();

  return (
    <ImageBackground
      style={styles.adsContainer}
      source={require('../../assets/Images/courses/2.png')} // Replace with the correct path to your image
    >
      <ImageBackground
        style={styles.adsContainer}
        source={require('../../assets/Images/courses/3.png')} // Replace with the correct path to your image
      >
        <Text style={styles.adsTile1}>ExamTime</Text>
        <Text style={styles.adsTile2}>Become a member</Text>
        <Text style={styles.adsText}>
          Lorem ipsum dolor sit amet, coincididunt ut labore et dolore magna
          aliqua.
        </Text>
        <View style={styles.adsBtnContainer}>
          <TouchableOpacity
            style={styles.adsBtns}
            touchSoundDisabled
            onPress={() => navigator.navigate('Signup')}>
            <Text style={styles.adsBtnsText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adsBtns, styles.adsBtns_secondary]}
            touchSoundDisabled
            onPress={() => navigator.navigate('Login')}>
            <Text style={styles.adsBtnsText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  adsContainer: {
    height: 190,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  adsTile1: {
    color: 'white',
    fontFamily: 'Montserrate-Regular',
    paddingHorizontal: '6%',
    marginTop: '4%',
    fontSize: 18,
  },
  adsTile2: {
    color: 'white',
    fontFamily: 'Montserrate-SemiBold',
    paddingHorizontal: '6%',
    fontSize: 24,
  },
  adsText: {
    color: '#b5b5b5',
    fontFamily: 'Montserrate-Regular',
    paddingHorizontal: '6%',
    fontSize: 14,
  },
  adsBtnContainer: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  adsBtns: {
    width: '43%',
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#6A5ACD',
  },
  adsBtns_secondary: {
    backgroundColor: '#0A6EC7',
  },
  adsBtnsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
});

export default AuthPrompt;
