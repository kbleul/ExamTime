import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const LoginForm = () => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.signinText}>Sign in</Text>

      <View style={styles.inputContainer}>
        <FontAwesome6
          name="user-large"
          size={20}
          color="#858585"
          style={styles.smallBox}
        />
        <TextInput style={styles.bigBox} placeholder="Email or phone number" />
      </View>
      <View style={[styles.inputContainer, styles.inputContainerSecondary]}>
        <TextInput
          autoComplete="password"
          placeholder="Password"
          style={[styles.bigBox, styles.bigBoxSecondary]}
        />
        <Ionicons
          name="eye-outline"
          size={20}
          color="#858585"
          style={styles.smallBox}
        />
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity touchSoundDisabled style={styles.rememberMeContainer}>
          <Feather name="square" size={18} />
          <Text style={styles.remembermeText}>remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity touchSoundDisabled>
          <Text style={styles.forgorPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity touchSoundDisabled style={styles.submitContainer}>
        <Text style={styles.submitBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
  signinText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#4D4D4D',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 40,
    borderColor: '#81afe6',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputContainerSecondary: {
    paddingHorizontal: 10,
  },
  smallBox: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigBox: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: '#4D4D4D',
  },
  bigBoxSecondary: {
    paddingLeft: 30,
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  remembermeText: {
    fontFamily: 'Montserrat-Regular',
    marginLeft: 4,
    fontSize: 14,
    color: '#858585',
  },
  forgorPasswordText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#0066B2',
  },
  submitContainer: {
    paddingVertical: 12,
    width: '100%',
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#1E90FF',
  },
  submitBtnText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
});
export default LoginForm;
