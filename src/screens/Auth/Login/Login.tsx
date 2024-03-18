import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LoginHeader from '../../../components/Molecules/LoginHeader';
import LoginForm from '../../../components/Organisms/LoginForm';
import AuthNavigatorOption from '../../../components/Organisms/AuthNavigatorOption';
import {screenHeight} from '../../../utils/Data/data';
import {calculateDateDifference} from '../../App/Onboarding/Logic';
import {AuthContext} from '../../../Realm/model';
import {UserData} from '../../../Realm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavContext} from '../../../context/bottomNav';

export default function Login() {
  const navigator = useNavigation<any>();
  const {setShowNavigation} = useNavContext();

  const {useQuery} = AuthContext;
  const savedUserData = useQuery(UserData);
  const dateDiff = calculateDateDifference(savedUserData[0].initialDate);

  useFocusEffect(
    useCallback(() => {
      setShowNavigation(false);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          dateDiff >= 3
            ? [styles.subContainer, styles.subContainerSecondary]
            : styles.subContainer
        }>
        <LoginHeader navigate={() => navigator.goBack()} />

        {dateDiff >= 3 && (
          <Text style={styles.note}>
            Your trial period is over. You must login or signup inorder to keep
            using this app.
          </Text>
        )}
        <LoginForm />
        {/* <SocialOptions /> */}
      </View>

      <AuthNavigatorOption
        headingText="Don’t have an account?"
        buttonText="Create one now"
        onPress={() => {
          setShowNavigation(false);
          navigator.navigate('Signup');
        }}
      />

      <View style={styles.homeBtnContainer}>
        <TouchableOpacity
          touchSoundDisabled
          onPress={() => {
            setShowNavigation(false);
            // navigator.navigate('HomeSection');
            navigator.getState().routeNames[0] === 'Home'
              ? navigator.navigate('Home')
              : navigator.navigate('HomeSection');
          }}>
          <Text style={styles.homeBtnText}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFF',
    paddingTop: 30,
  },
  subContainer: {
    borderBottomWidth: 1,
    borderColor: '#B5C3E5',
    paddingBottom: 38,
    marginHorizontal: 15,
    marginBottom: screenHeight / 9,
  },
  subContainerSecondary: {
    marginBottom: 15,
  },
  note: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: 'black',
    borderWidth: 1,
    paddingVertical: 4,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  homeBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  homeBtn: {
    alignSelf: 'center',
  },
  homeBtnText: {
    color: '#1E90FF',
    fontFamily: 'PoppinsSemiBold',
  },
});
