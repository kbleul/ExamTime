import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TextInput} from 'react-native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';

export default function Signup() {
  const navigator = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.topSectionContainer}>
        <View style={styles.topSectionSubContainer}>
          <TouchableOpacity
            touchSoundDisabled
            onPress={() => navigator.goBack()}
            style={styles.backIconContainer}>
            <AntDesign name="left" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgcontainer}>
          <FontAwesome6 name="user-large" size={55} color="#858585" />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.signinText}>Sign in</Text>

        <View style={styles.inputContainer}>
          <FontAwesome6
            name="user-large"
            size={25}
            color="#858585"
            style={styles.smallBox}
          />
          <TextInput
            style={styles.bigBox}
            placeholder="Email or phone number"
          />
        </View>
        <View style={[styles.inputContainer, styles.inputContainerSecondary]}>
          <TextInput
            autoComplete="password"
            placeholder="Password"
            style={[styles.bigBox, styles.bigBoxSecondary]}
          />
          <Ionicons
            name="eye-outline"
            size={25}
            color="#858585"
            style={styles.smallBox}
          />
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            touchSoundDisabled
            style={styles.rememberMeContainer}>
            <Feather name="square" size={18} />
            <Text style={styles.remembermeText}>remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity touchSoundDisabled>
            <Text style={styles.forgorPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.authOptionsContainer}>
          <View style={styles.authOptionsTextContainer}>
            <View style={styles.dividerLines} />
            <Text style={styles.dividerText}>or sign in with</Text>
            <View style={styles.dividerLines} />
          </View>
        </View>

        <View style={styles.optionsIconCOntainer}>
          <TouchableOpacity touchSoundDisabled>
            <AntDesign name="google" color={'#5865F2'} size={32} />
          </TouchableOpacity>
          <TouchableOpacity touchSoundDisabled>
            <FontAwesome5Brands name="facebook" color={'#1877F2'} size={34} />
          </TouchableOpacity>
          <TouchableOpacity touchSoundDisabled>
            <AntDesign name="twitter" color={'#2AABEE'} size={32} />
          </TouchableOpacity>
          <TouchableOpacity touchSoundDisabled>
            <AntDesign name="apple1" color={'#000'} size={32} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.regiterPromptContainer}>
        <Text style={styles.registerPromptText}>don’t have an account? </Text>
        <TouchableOpacity touchSoundDisabled>
          <Text style={styles.registerPromptBtnText}>Create one now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topSectionContainer: {
    height: '33%',
  },
  backIconContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  topSectionSubContainer: {
    height: '60%',
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
    backgroundColor: '#1E90FF',
  },
  imgcontainer: {
    position: 'absolute',
    top: '25%',
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  signinText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#4D4D4D',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    paddingVertical: 1,
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
  authOptionsContainer: {
    marginTop: 40,
    width: '100%',
  },
  authOptionsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerLines: {
    width: '33.33%',
    borderTopWidth: 1,
    borderColor: '#B5C3E5',
  },
  dividerText: {
    width: '33.33%',
    color: '#858585',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  optionsIconCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#c9c7c7',
    paddingVertical: 5,
    marginTop: 20,
  },
  regiterPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  registerPromptText: {
    color: '#4F4F4F',
  },
  registerPromptBtnText: {
    color: '#1E90FF',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 2,
  },
});
