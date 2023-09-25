import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useNavigationState} from '@react-navigation/native';

const coursesPages = ['Courses', 'View-Course', 'View-Course-Content'];
const profilePages = ['Profile', 'Profile-Edit'];
const MainBottomNav = () => {
  const navigationState = useNavigationState(state => state);
  const currentScreen = navigationState.routes[navigationState.index].name;
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.btnsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={
            currentScreen === 'Home'
              ? [style.button, style.buttonSelected]
              : style.button
          }>
          <FontAwesome name="home" size={23} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Courses')}
          style={
            coursesPages.includes(currentScreen)
              ? [style.button, style.buttonSelected]
              : style.button
          }>
          <Feather name="book-open" size={23} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={
            currentScreen === ''
              ? [style.button, style.buttonSelected]
              : style.button
          }>
          <Ionicons name="newspaper-outline" size={23} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          style={
            currentScreen === ''
              ? [style.button, style.buttonSelected]
              : style.button
          }>
          <MaterialCommunityIcons
            name="progress-clock"
            size={23}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={
            profilePages.includes(currentScreen)
              ? [style.button, style.buttonSelected]
              : style.button
          }>
          <AntDesign name="user" size={23} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#AED1F3',
    paddingHorizontal: 10,
  },
  button: {
    padding: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonSelected: {
    backgroundColor: '#0066B2',
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default MainBottomNav;
