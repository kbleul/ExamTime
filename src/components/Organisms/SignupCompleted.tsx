import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {formStyles} from '../../screens/Auth/Signup/Styles';

const SignupCompleted = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer_second}>
          <View style={styles.buttonContainer_three}>
            <Feather name="check" style={styles.arrowIcon} size={110} />
          </View>
        </View>
      </View>

      <View style={styles.textContaienr}>
        <Text style={styles.mainText}>Verification Successful!</Text>
        <Text style={styles.subText}>
          Login to your account to complete signup.
        </Text>
      </View>

      <TouchableOpacity
        style={[formStyles.submitBtn, styles.submitBtn]}
        touchSoundDisabled
        onPress={() => navigator.navigate('Login')}>
        <Text style={formStyles.submitText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 70,
  },
  buttonContainer: {
    width: 200,
    height: 200,
    borderRadius: 1000,
    overflow: 'hidden',
    backgroundColor: '#e6f0f7',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '13%',
  },
  buttonContainer_second: {
    width: 160,
    height: 160,
    borderRadius: 800,
    overflow: 'hidden',
    backgroundColor: '#C1E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer_three: {
    width: 120,
    height: 120,
    borderRadius: 800,
    overflow: 'hidden',
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  arrowIcon: {
    color: 'white',
  },
  textContaienr: {
    marginTop: 40,
  },
  mainText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: '#4BB543',
  },
  subText: {
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  submitBtn: {
    marginTop: 40,
  },
});
export default SignupCompleted;
