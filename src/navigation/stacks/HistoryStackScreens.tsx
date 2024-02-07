import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import History from '../../screens/App/History';
import NetworkError from '../../screens/Shared/NetworkError';
import ChapaWebView from '../../screens/App/Payment/ChapaWebView';

const HistoryStackScreens = () => {
  const HistoryStack = createStackNavigator();
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
      <HistoryStack.Screen
        name="network-error"
        component={NetworkError}
        options={{headerShown: false}}
      />
      <HistoryStack.Screen
        name="chapa-payment"
        component={ChapaWebView}
        options={{headerShown: false}}
      />
    </HistoryStack.Navigator>
  );
};

export default HistoryStackScreens;
