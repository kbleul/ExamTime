import React from 'react';
import Login from '../screens/Auth/Signup/Signup';
import Signup from '../screens/Auth/Login/Login';
import {StackType} from './types';

const AuthRoutes: React.FC<StackType> = ({Stack}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
