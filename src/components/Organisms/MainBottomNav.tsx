import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
          <View
            style={
              currentScreen === 'Home'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <FontAwesome
              name="home"
              size={screenWidth * 0.06}
              style={currentScreen === 'Home' ? style.iconActive : style.icon}
            />
          </View>
          {currentScreen === 'Home' ? (
            <View style={style.dot} />
          ) : (
            <View style={[style.dot, style.dotHidden]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudySection')}
          style={style.buttonWrapper}>
          <View
            style={
              currentScreen === 'StudySection'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <Feather
              name="book-open"
              size={screenWidth * 0.06}
              style={
                currentScreen === 'StudySection' ? style.iconActive : style.icon
              }
            />
          </View>
          {currentScreen === 'StudySection' ? (
            <View style={style.dot} />
          ) : (
            <View style={[style.dot, style.dotHidden]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Practice')}
          style={style.buttonWrapper}>
          <View
            style={
              currentScreen === 'Practice' || currentScreen === 'Exam-View'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={screenWidth * 0.06}
              color="white"
              style={
                currentScreen === 'Practice' || currentScreen === 'Exam-View'
                  ? style.iconActive
                  : style.icon
              }
            />
          </View>
          {currentScreen === 'Practice' || currentScreen === 'Exam-View' ? (
            <View style={style.dot} />
          ) : (
            <View style={[style.dot, style.dotHidden]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={style.buttonWrapper}>
          <View
            style={
              currentScreen === 'History'
                ? [style.button, style.buttonSelected]
                : style.button
            }>
            <MaterialCommunityIcons
              name="progress-clock"
              size={screenWidth * 0.06}
              style={
                currentScreen === 'History' ? style.iconActive : style.icon
              }
            />
          </View>
          {currentScreen === 'History' ? (
            <View style={style.dot} />
          ) : (
            <View style={[style.dot, style.dotHidden]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={style.buttonWrapper}>
          {currentScreen === 'Profile' || currentScreen === 'Profile-Edit' ? (
            <View style={style.dot} />
          ) : (
            <View style={[style.dot, style.dotHidden]} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: screenHeight * 0.11,
    backgroundColor: '#fff',
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
    width: screenWidth * 0.11,
    height: screenWidth * 0.11,
    maxWidth: 55,
    maxHeight: 55,
    paddingTop: 10,
  },
  buttonSelected: {
    backgroundColor: '#00509D',
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
    fontSize: screenWidth * 0.022,
    fontFamily: 'Montserrat-Regular',
    color: '#1E90FF',
    marginTop: 2,
  },
  dot: {
    width: screenWidth * 0.02,
    height: screenWidth * 0.02,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#00509D',
    marginTop: 3,
  },
  dotHidden: {
    backgroundColor: '#fff',
  },
  icon: {
    color: '#1E90FF',
  },
  iconActive: {
    color: '#fff',
  },
});

export default MainBottomNav;
