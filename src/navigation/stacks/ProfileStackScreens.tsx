import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ProfileMenuItemsAuth} from '../../utils/Data/data';

import Login from '../../screens/Auth/Login/Login';
import ForgotPassword from '../../screens/Auth/Login/ForgotPassword';
import NetworkError from '../../screens/Shared/NetworkError';
import SignupCompleted from '../../components/Organisms/SignupCompleted';
import Signup from '../../screens/Auth/Signup/Signup';
import SetNewPasswordPage from '../../screens/Auth/SetNewPassword';
import Profile from '../../screens/App/Profile/index';
import ContactUs from '../../screens/App/ContactUs/index';
import FAQ from '../../screens/App/FAQ/index';
import UserGuide from '../../screens/App/UserGuide';
import ProfileEditIndex from '../../screens/App/Profile/ProfileEditIndex';
import SubscriptionPlan from '../../screens/App/SubscriptionPlan/index';
import Aboutus from '../../screens/App/Aboutus/index';

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
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreens;
