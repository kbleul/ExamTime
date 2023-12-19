import 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Routes from './src/navigation/Index';
import {Provider} from 'react-redux';
import store from './src/reduxToolkit/Store';
import {AuthContext} from './src/Realm/model';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  const {RealmProvider} = AuthContext;
  StatusBar.setHidden(true);

  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  const Stack = createStackNavigator();

  return (
    <RealmProvider>
      <NavigationContainer>
        <GluestackUIProvider config={config.theme}>
          <Provider store={store}>
            <StatusBar hidden={true} />

            <Routes Stack={Stack} />
          </Provider>
        </GluestackUIProvider>
      </NavigationContainer>
    </RealmProvider>
  );
}

export default App;
