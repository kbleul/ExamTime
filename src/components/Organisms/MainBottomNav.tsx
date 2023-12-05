import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {screenHeight, screenWidth} from '../../utils/Data/data';

const MainBottomNav = () => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;
  const navigation: any = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.btnsContainer}>
        <TouchableOpacity
          style={style.buttonWrapper}
          onPress={() => navigation.navigate('Home')}>
          {currentScreen === 'Home' && <View style={style.dot} />}
          <View
            style={
              currentScreen === 'Home'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <FontAwesome
              name="home"
              size={screenWidth * 0.055}
              style={currentScreen === 'Home' ? style.iconActive : style.icon}
            />
            <Text
              style={
                currentScreen === 'Home'
                  ? style.buttonTextActive
                  : style.buttonText
              }>
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudySection')}
          style={style.buttonWrapper}>
          {currentScreen === 'StudySection' && <View style={style.dot} />}

          <View
            style={
              currentScreen === 'StudySection'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <Feather
              name="book-open"
              size={screenWidth * 0.055}
              style={
                currentScreen === 'StudySection' ? style.iconActive : style.icon
              }
            />
            <Text
              style={
                currentScreen === 'StudySection'
                  ? style.buttonTextActive
                  : style.buttonText
              }>
              Study
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Practice')}
          style={style.buttonWrapper}>
          {(currentScreen === 'Practice' || currentScreen === 'Exam-View') && (
            <View style={style.dot} />
          )}

          <View
            style={
              currentScreen === 'Practice' || currentScreen === 'Exam-View'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={screenWidth * 0.055}
              color="white"
              style={
                currentScreen === 'Practice' || currentScreen === 'Exam-View'
                  ? style.iconActive
                  : style.icon
              }
            />
            <Text
              style={
                currentScreen === 'Practice' || currentScreen === 'Exam-View'
                  ? style.buttonTextActive
                  : style.buttonText
              }>
              Practice
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={style.buttonWrapper}>
          {currentScreen === '' && <View style={style.dot} />}

          <View
            style={
              currentScreen === ''
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <MaterialCommunityIcons
              name="progress-clock"
              size={screenWidth * 0.055}
              style={currentScreen === '' ? style.iconActive : style.icon}
            />
            <Text
              style={
                currentScreen === '' ? style.buttonTextActive : style.buttonText
              }>
              History
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={style.buttonWrapper}>
          {(currentScreen === 'Profile' ||
            currentScreen === 'Profile-Edit') && (
            // Object.keys(ProfileMenuItemsAuth).includes(currentScreen))
            <View style={style.dot} />
          )}

          <View
            style={
              currentScreen === 'Profile' || currentScreen === 'Profile-Edit'
                ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                  [style.button, style.buttonSelected]
                : style.button
            }>
            <AntDesign
              name="setting"
              size={screenWidth * 0.055}
              style={
                currentScreen === 'Profile' || currentScreen === 'Profile-Edit'
                  ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                    style.iconActive
                  : style.icon
              }
            />
            <Text
              style={
                currentScreen === 'Profile' || currentScreen === 'Profile-Edit'
                  ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                    style.buttonTextActive
                  : style.buttonText
              }>
              Setting
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: screenHeight * 0.088,
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: screenHeight * 0.001,
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    maxWidth: 55,
    maxHeight: 55,
    paddingTop: 10,
  },
  buttonSelected: {
    backgroundColor: '#0066B2',
    borderColor: 'white',
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonTextActive: {
    fontSize: screenWidth * 0.02,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    marginTop: 2,
  },
  buttonText: {
    fontSize: screenWidth * 0.025,
    fontFamily: 'Montserrat-Regular',
    color: '#1E90FF',
    marginTop: 2,
  },
  dot: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0066B2',
    marginBottom: 3,
  },
  icon: {
    color: '#1E90FF',
  },
  iconActive: {
    color: '#fff',
  },
});

export default MainBottomNav;
