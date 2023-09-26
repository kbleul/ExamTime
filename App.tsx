import 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Routes from './src/navigation/Index';
import {Platform, StatusBar} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content');
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content');
    }
    BootSplash.hide({fade: true});
  }, []);

  useEffect(() => {}, []);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <Routes Stack={Stack} />
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

// const Home = () => {
//   return (
//     <View>
//       <Text>Home is here</Text>
//     </View>
//   );
// };

export default App;
