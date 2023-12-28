import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import History from '../../screens/App/History';

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

export default HistoryStackScreens;
