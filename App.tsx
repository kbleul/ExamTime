import 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Routes from './src/navigation/Index';
import {AuthProvider} from './src/context/auth';
import {Provider} from 'react-redux';
import store from './src/reduxToolkit/Store';
import { get_from_localStorage } from './src/utils/Functions/Get';
import { LocalStorageDataKeys } from './src/utils/Data/data';
import Config from 'react-native-config';

function App(): JSX.Element {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  useEffect(() => {}, []);
  const Stack = createStackNavigator();
  console.log('my url ', Config.API_URL);
  console.log(get_from_localStorage(LocalStorageDataKeys.userGrade))
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <AuthProvider>
          <Provider store={store}>
            <Routes Stack={Stack} />
          </Provider>
        </AuthProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

export default App;
