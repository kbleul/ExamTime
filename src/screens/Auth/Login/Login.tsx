import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SocialOptions from '../components/Organisms/SocialOptions';
import LoginForm from './components/Organisms/LoginForm';

export default function Login() {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
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
            <FontAwesome6 name="user-large" size={45} color="#858585" />
          </View>
        </View>

        <LoginForm />
        <SocialOptions />

        <View style={styles.regiterPromptContainer}>
          <Text style={styles.registerPromptText}>don’t have an account? </Text>
          <TouchableOpacity
            touchSoundDisabled
            onPress={() => navigator.navigate('Signup')}>
            <Text style={styles.registerPromptBtnText}>Create one now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  subContainer: {
    height: '105%',
  },
  topSectionContainer: {
    height: '20%',
  },
  backIconContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  topSectionSubContainer: {
    height: '65%',
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
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regiterPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
