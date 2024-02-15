import React from 'react';
import MessageBox from './MessageBox';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ProfileMenuItemsAuth,
  screenHeight,
  screenWidth,
} from '../../utils/Data/data';
import {useNavigation} from '@react-navigation/native';

const LoginBox = ({
  title,
  subTitle,
  isSubscribe,
}: {
  title?: string;
  subTitle?: string;
  isSubscribe?: boolean;
}) => {
  const navigator: any = useNavigation();

  return (
    <View style={styles.container}>
      <MessageBox title={title} subTitle={subTitle} />

      <View style={styles.formBox}>
        {isSubscribe && (
          <TouchableOpacity
            style={styles.button}
            touchSoundDisabled
            onPress={() =>
              navigator.navigate('ProfileSection', {
                screen: ProfileMenuItemsAuth['Subscription Plan'].navigate,
              })
            }>
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        )}

        {!isSubscribe && (
          <>
            <TouchableOpacity
              style={styles.button}
              touchSoundDisabled
              onPress={() => {
                navigator.navigate('Login');
              }}>
              <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              touchSoundDisabled
              onPress={() => {
                navigator.navigate('Signup');
              }}>
              <Text style={styles.buttonText}>Register </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  formBox: {
    marginTop: screenHeight * 0.025,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: screenWidth * 0.08,
  },
  button: {
    paddingHorizontal: screenWidth * 0.09,
    paddingVertical: screenWidth * 0.02,
    borderRadius: 10,
    backgroundColor: '#6A5ACD',
  },
  buttonSecondary: {
    backgroundColor: '#0A6EC7',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.045,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
});

export default LoginBox;
