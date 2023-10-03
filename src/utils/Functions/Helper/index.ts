import NetInfo from '@react-native-community/netinfo';

export const isOnline = async () => {
  try {
    const state = await NetInfo.fetch();
    console.log('reach', state.isInternetReachable);
    return state.isConnected && state.isInternetReachable ? true : false;
  } catch (error) {
    // Handle any errors (e.g., request timeout)
    console.error('Error checking network status:', error);
    return false; // Assume offline on error
  }
};
