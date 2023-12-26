import React from 'react';
import Onboarding from '../screens/App/Onboarding/index';
import Home from '../screens/App/Home/index';
import Profile from '../screens/App/Profile/index';
import Aboutus from '../screens/App/Aboutus/index';
import SubscriptionPlan from '../screens/App/SubscriptionPlan/index';
import StudySection from '../screens/App/Study/index';
import ChallengeSection from '../screens/App/Challenge/index';
import ProfileEditIndex from '../screens/App/Profile/ProfileEditIndex';
import Login from '../screens/Auth/Login/Login';
import Signup from '../screens/Auth/Signup/Signup';
import NetworkError from '../screens/Shared/NetworkError';
import ContactUs from '../screens/App/ContactUs/index';
import FAQ from '../screens/App/FAQ/index';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import SignupCompleted from '../components/Organisms/SignupCompleted';
import ViewSubjectDetails from '../screens/App/Courses/ViewSubjectDetails';
import ViewCourseContent from '../screens/App/Courses/ViewCourseContent';
import Practice from '../screens/App/Practice/index';
import PracticeQuestion from '../screens/App/PracticeQuestion';
import {
  ProfileMenuItemsAuth,
  screenHeight,
  screenWidth,
} from '../utils/Data/data';
import SetNewPasswordPage from '../screens/Auth/SetNewPassword';
import ExamReview from '../screens/App/PracticeQuestion/ExamReview';
import ExamResult from '../screens/App/PracticeQuestion/ExamResult';
import RandomQuestionsView from '../screens/App/PracticeQuestion/RandomQuestionsView';
import UserGuide from '../screens/App/UserGuide';
import StudyDetails from '../screens/App/Study/StudyDetails';
import ViewPdf from '../screens/App/Study/ViewPdf';
import ViewVideo from '../screens/App/Study/ViewVideo';
import ViewAssessment from '../screens/App/Study/ViewAssessment';
import History from '../screens/App/History';
import Notification from '../screens/App/Notification';
import NotificationProvider from '../context/notification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {useNavContext} from '../context/bottomNav';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useOnboardingContext} from '../context/onboarding';

const HomeStackScreens = () => {
  const StudyStack = createStackNavigator();

  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudySection"
        component={StudySection}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ChallengeScreen"
        component={ChallengeSection}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="View-Course"
        component={ViewSubjectDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="View-Course-Content"
        component={ViewCourseContent}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudyDetails"
        component={StudyDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['Contact Us'].navigate}
        component={ContactUs}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['FAQ'].navigate}
        component={FAQ}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['User Guide'].navigate}
        component={UserGuide}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile-Edit"
        component={ProfileEditIndex}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="signup-success"
        component={SignupCompleted}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="SubscriptionPlan"
        component={SubscriptionPlan}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Password-Reset"
        component={SetNewPasswordPage}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </StudyStack.Navigator>
  );
};

const StudyStackScreens = () => {
  const StudyStack = createStackNavigator();
  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="StudySection"
        component={StudySection}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ChallengeScreen"
        component={ChallengeSection}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudyDetails"
        component={StudyDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['Contact Us'].navigate}
        component={ContactUs}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['FAQ'].navigate}
        component={FAQ}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['User Guide'].navigate}
        component={UserGuide}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile-Edit"
        component={ProfileEditIndex}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="signup-success"
        component={SignupCompleted}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="SubscriptionPlan"
        component={SubscriptionPlan}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Password-Reset"
        component={SetNewPasswordPage}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </StudyStack.Navigator>
  );
};

const PracticeStackScreens = () => {
  const StudyStack = createStackNavigator();

  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudySection"
        component={StudySection}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ChallengeScreen"
        component={ChallengeSection}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="View-Course"
        component={ViewSubjectDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="View-Course-Content"
        component={ViewCourseContent}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="StudyDetails"
        component={StudyDetails}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['Contact Us'].navigate}
        component={ContactUs}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['FAQ'].navigate}
        component={FAQ}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name={ProfileMenuItemsAuth['User Guide'].navigate}
        component={UserGuide}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Profile-Edit"
        component={ProfileEditIndex}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="signup-success"
        component={SignupCompleted}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="SubscriptionPlan"
        component={SubscriptionPlan}
        options={{headerShown: false}}
      />
      <StudyStack.Screen
        name="Password-Reset"
        component={SetNewPasswordPage}
        options={{headerShown: false}}
      />

      <StudyStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </StudyStack.Navigator>
  );
};
const HistoryStackScreens = () => {
  const HistoryStack = createStackNavigator();
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </HistoryStack.Navigator>
  );
};

const ProfileStackScreens = () => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="View-Course"
        component={ViewSubjectDetails}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="View-Course-Content"
        component={ViewCourseContent}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Practice"
        component={Practice}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Exam-View"
        component={PracticeQuestion}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Random-Exam"
        component={RandomQuestionsView}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Exam-Review"
        component={ExamReview}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Exam-Result"
        component={ExamResult}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="StudyDetails"
        component={StudyDetails}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="ViewAssessment"
        component={ViewAssessment}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name={ProfileMenuItemsAuth['Contact Us'].navigate}
        component={ContactUs}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={ProfileMenuItemsAuth['FAQ'].navigate}
        component={FAQ}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={ProfileMenuItemsAuth['User Guide'].navigate}
        component={UserGuide}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="Profile-Edit"
        component={ProfileEditIndex}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="signup-success"
        component={SignupCompleted}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="SubscriptionPlan"
        component={SubscriptionPlan}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="Password-Reset"
        component={SetNewPasswordPage}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const AppRoutes = ({Stack}: {Stack: any}) => {
  const Tab = createBottomTabNavigator();
  const {showNavigation} = useNavContext();
  const {showOnboarding} = useOnboardingContext();

  const navigator: any = useNavigation();

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
                tabBarIcon: ({color, size, focused}) => (
                  <>
                    <View
                      style={
                        focused
                          ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                            [style.button, style.buttonSelected]
                          : style.button
                      }>
                      <FontAwesome
                        name="home"
                        size={screenWidth * 0.06}
                        color="white"
                        style={focused ? style.iconActive : style.icon}
                      />
                    </View>

                    {focused ? (
                      <View style={style.dot} />
                    ) : (
                      <View style={[style.dot, style.dotHidden]} />
                    )}
                  </>
                ),
                unmountOnBlur: route.name !== 'HomeSection', // Unmount nested screens when tab is not focused
              })}
            />

            <Tab.Screen
              name="Study"
              component={StudyStackScreens}
              options={({route}) => ({
                tabBarIcon: ({color, size, focused}) => (
                  <>
                    <View
                      style={
                        focused
                          ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                            [style.button, style.buttonSelected]
                          : style.button
                      }>
                      <Feather
                        name="book-open"
                        size={screenWidth * 0.06}
                        color="white"
                        style={focused ? style.iconActive : style.icon}
                      />
                    </View>

                    {focused ? (
                      <View style={style.dot} />
                    ) : (
                      <View style={[style.dot, style.dotHidden]} />
                    )}
                  </>
                ),
                unmountOnBlur: route.name !== 'Study', // Unmount nested screens when tab is not focused
              })}
            />

            <Tab.Screen
              name="PracticeSection"
              component={PracticeStackScreens}
              options={({route}) => ({
                tabBarIcon: ({color, size, focused}) => (
                  <>
                    <View
                      style={
                        focused
                          ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                            [style.button, style.buttonSelected]
                          : style.button
                      }>
                      <MaterialCommunityIcons
                        name="file-document-edit-outline"
                        size={screenWidth * 0.06}
                        color="white"
                        style={focused ? style.iconActive : style.icon}
                      />
                    </View>

                    {focused ? (
                      <View style={style.dot} />
                    ) : (
                      <View style={[style.dot, style.dotHidden]} />
                    )}
                  </>
                ),
                unmountOnBlur: route.name !== 'PracticeSection', // Unmount nested screens when tab is not focused
              })}
            />

            <Tab.Screen
              name="HistorySection"
              component={HistoryStackScreens}
              options={({route}) => ({
                tabBarIcon: ({color, size, focused}) => (
                  <>
                    <View
                      style={
                        focused
                          ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                            [style.button, style.buttonSelected]
                          : style.button
                      }>
                      <MaterialCommunityIcons
                        name="progress-clock"
                        size={screenWidth * 0.06}
                        style={
                          focused
                            ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                              style.iconActive
                            : style.icon
                        }
                      />
                    </View>

                    {focused ? (
                      <View style={style.dot} />
                    ) : (
                      <View style={[style.dot, style.dotHidden]} />
                    )}
                  </>
                ),
                unmountOnBlur: route.name !== 'HistorySection', // Unmount nested screens when tab is not focused
              })}
            />

            <Tab.Screen
              name="ProfileSection"
              component={ProfileStackScreens}
              options={({route}) => ({
                tabBarIcon: ({focused}) => (
                  <>
                    <View
                      style={
                        focused
                          ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                            [style.button, style.buttonSelected]
                          : style.button
                      }>
                      <AntDesign
                        name="setting"
                        size={screenWidth * 0.06}
                        style={
                          focused
                            ? // Object.keys(ProfileMenuItemsAuth).includes(currentScreen)
                              style.iconActive
                            : style.icon
                        }
                      />
                    </View>

                    {focused ? (
                      <View style={style.dot} />
                    ) : (
                      <View style={[style.dot, style.dotHidden]} />
                    )}
                  </>
                ),
                unmountOnBlur: route.name !== 'ProfileSection', // Unmount nested screens when tab is not focused
                tabBarButton: props => (
                  <TouchableOpacity
                    {...props}
                    onPress={() => {
                      navigator.navigate('ProfileSection', {
                        screen: 'Profile',
                      });
                    }}
                  />
                ),
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
