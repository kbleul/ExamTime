import NetInfo from '@react-native-community/netinfo';
import {NavigationProp} from '@react-navigation/native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const checkIsOnline = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
) => {
  try {
    const state = await NetInfo.fetch();

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

export const handleCarouselScroll = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
  screenWidth: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const scrollPosition = event.nativeEvent.contentOffset.x;

  const index = scrollPosition / screenWidth;
  setActiveIndex(index);
};

export const getItemLayout = (
  data:
    | {
        id: string;
        image: any;
      }[]
    | null,
  index: number,
  screenWidth: number,
) => ({
  length: screenWidth,
  offset: screenWidth * index,
  index,
});
