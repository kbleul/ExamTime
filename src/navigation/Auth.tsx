import React from 'react';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
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
