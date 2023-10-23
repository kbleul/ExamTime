import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {ProfileMenuItemsAuth} from '../../utils/Data/data';

const MainBottomNav = () => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;
  const navigation = useNavigation();
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
              size={23}
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
          onPress={() => navigation.navigate('Courses')}
          style={style.buttonWrapper}>
          {currentScreen === 'Courses' && <View style={style.dot} />}

          <View
            style={
              currentScreen === 'Courses'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <Feather
              name="book-open"
              size={24}
              style={
                currentScreen === 'Courses' ? style.iconActive : style.icon
              }
            />
            <Text
              style={
                currentScreen === 'Courses'
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
            <Ionicons
              name="newspaper-outline"
              size={24}
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
              size={24}
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
            Object.keys(ProfileMenuItemsAuth).includes(currentScreen)) && (
            <View style={style.dot} />
          )}

          <View
            style={
              currentScreen === 'Profile' ||
              Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <AntDesign
              name="setting"
              size={24}
              style={
                currentScreen === 'Profile' ||
                Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                  ? style.iconActive
                  : style.icon
              }
            />
            <Text
              style={
                currentScreen === 'Profile' ||
                Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                  ? style.buttonTextActive
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
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 12,
    width: 55,
    height: 55,
  },
  buttonSelected: {
    backgroundColor: '#0066B2',
    borderColor: 'white',
    marginTop: 0,
  },
  buttonTextActive: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    marginTop: 2,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#1E90FF',
    marginTop: 2,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 10,
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
