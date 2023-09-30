import {NavigationProp} from '@react-navigation/native';
import {set_to_localStorage} from '../../../../../utils/Functions/Set';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LocalStorageDataKeys,
  trialStatus,
} from '../../../../../utils/Data/data';

export const calculateDateDifference = (date: string) => {
  const startDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - startDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

export const checkIsTrial = async () => {
  let status;
  // Check if trial start date is stored in AsyncStorage
  const trialStartDate = 'Sat Sep 25 2023 06:14:03 GMT-0400';

  if (!trialStartDate) {
    // Set trial start date if not already set
    const currentDate = new Date().toString();
    await AsyncStorage.setItem(
      LocalStorageDataKeys.trialStartDate,
      currentDate,
    );
    status = trialStatus.started;
    console.log('object1');
  } else {
    // Compare trial start date with current date
    const daysDifference = calculateDateDifference(trialStartDate);

    if (daysDifference >= 3) {
      // Trial period has ended
      status = trialStatus.expired;
      console.log('object3');
    } else {
      console.log('object5');
      // Within the trial period
      status = trialStatus.trial;
    }
  }

  return status;
};

export const onboarding_save_navToHome = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  set_to_localStorage(LocalStorageDataKeys.onBoarding, true);
  // startTrialCounter()
  navigation.navigate('Home');
};
