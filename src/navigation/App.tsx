import React, {memo} from 'react';
import Onboarding from '../screens/App/Onboarding/index';
import {screenHeight, screenWidth} from '../utils/Data/data';
import NotificationProvider from '../context/notification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View} from 'react-native';
import {useNavContext} from '../context/bottomNav';
import {useOnboardingContext} from '../context/onboarding';
import HomeStackScreens from './stacks/HomeStackScreens';
import StudyStackScreens from './stacks/StudyStackScreens';
import PracticeStackScreens from './stacks/PracticeStackScreens';
import HistoryStackScreens from './stacks/HistoryStackScreens';
import ProfileStackScreens from './stacks/ProfileStackScreens';

const TABSList = [
  'HomeSection',
  'Study',
  'PracticeSection',
  'HistorySection',
  'ProfileSection',
];

const AppRoutes = ({Stack}: {Stack: any}) => {
  const Tab = createBottomTabNavigator();
  const {showNavigation} = useNavContext();
  const {showOnboarding} = useOnboardingContext();

  return (
    <NotificationProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {!showOnboarding && (
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarStyle: {
                display: showNavigation ? 'flex' : 'none',
                height: 67,
              },
            }}>
            <Tab.Screen
              name="HomeSection"
              component={HomeStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  // eslint-disable-next-line
                  <RenderTab type="HomeSection" focused={focused} />
                ),
                unmountOnBlur: route.name !== 'HomeSection',
              })}
            />

            <Tab.Screen
              name="Study"
              component={StudyStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  <RenderTab type="Study" focused={focused} />
                ),
                unmountOnBlur: route.name !== 'Study',
              })}
            />

            <Tab.Screen
              name="PracticeSection"
              component={PracticeStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  <RenderTab type="PracticeSection" focused={focused} />
                ),
                unmountOnBlur: route.name !== 'PracticeSection',
              })}
            />

            <Tab.Screen
              name="HistorySection"
              component={HistoryStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  <RenderTab type="HistorySection" focused={focused} />
                ),
                unmountOnBlur: route.name !== 'HistorySection',
              })}
            />

            <Tab.Screen
              name="ProfileSection"
              component={ProfileStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  <RenderTab type="ProfileSection" focused={focused} />
                ),
                unmountOnBlur: route.name !== 'ProfileSection',
              })}
            />
          </Tab.Navigator>
        )}

        {showOnboarding && (
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </GestureHandlerRootView>
    </NotificationProvider>
  );
};

const AssignSVG = (type: string, focused: boolean) => {
  switch (type) {
    case TABSList[0]:
      return (
        <FontAwesome
          name="home"
          size={screenWidth * 0.06}
          color="white"
          style={focused ? style.iconActive : style.icon}
        />
      );
    case TABSList[1]:
      return (
        <Feather
          name="book-open"
          size={screenWidth * 0.06}
          color="white"
          style={focused ? style.iconActive : style.icon}
        />
      );
    case TABSList[2]:
      return (
        <MaterialCommunityIcons
          name="file-document-edit-outline"
          size={screenWidth * 0.06}
          color="white"
          style={focused ? style.iconActive : style.icon}
        />
      );
    case TABSList[3]:
      return (
        <MaterialCommunityIcons
          name="progress-clock"
          size={screenWidth * 0.06}
          style={focused ? style.iconActive : style.icon}
        />
      );
    case TABSList[4]:
      return (
        <AntDesign
          name="setting"
          size={screenWidth * 0.06}
          style={focused ? style.iconActive : style.icon}
        />
      );

    default:
      return <></>;
  }
};

const RenderTab = memo(({type, focused}: {type: string; focused: boolean}) => {
  return (
    <>
      <View
        style={focused ? [style.button, style.buttonSelected] : style.button}>
        {AssignSVG(type, focused)}
      </View>

      {focused ? (
        <View style={style.dot} />
      ) : (
        <View style={[style.dot, style.dotHidden]} />
      )}
    </>
  );
});

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

export default AppRoutes;
