import NetInfo from '@react-native-community/netinfo';
import {NavigationProp} from '@react-navigation/native';

export const checkIsOnline = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
) => {
  try {
    const state = await NetInfo.fetch();
    console.log('reach', state.isInternetReachable);

    if (!state.isConnected || !state.isInternetReachable) {
      navigator.navigate('network-error');
    }
    return;
  } catch (error) {
    // Handle any errors (e.g., request timeout)
    navigator.navigate('network-error');
    return; // Assume offline on error
  }
};
