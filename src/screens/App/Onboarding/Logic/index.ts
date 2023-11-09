import {NavigationProp} from '@react-navigation/native';
import {set_to_localStorage} from '../../../../utils/Functions/Set';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
  trialStatus,
} from '../../../../utils/Data/data';
import {get_from_localStorage} from '../../../../utils/Functions/Get';
import Realm from 'realm';

export const calculateDateDifference = (date: string) => {
  const startDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - startDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

//trialStartDate format for testing = 'Sat Sep 25 2023 06:14:03 GMT-0400';
export const checkIsTrial = async () => {
  let status;
  // Check if trial start date is stored in AsyncStorage
  const trialStartDate = await AsyncStorage.getItem(
    LocalStorageDataKeys.trialStartDate,
  );

  if (!trialStartDate) {
    // Set trial start date if not already set
    const currentDate = new Date().toString();
    await AsyncStorage.setItem(
      LocalStorageDataKeys.trialStartDate,
      currentDate,
    );
    status = trialStatus.started;
  } else {
    // Compare trial start date with current date
    const daysDifference = calculateDateDifference(trialStartDate);

    if (daysDifference >= 3) {
      // Trial period has ended
      status = trialStatus.expired;
    } else {
      // Within the trial period
      status = trialStatus.trial;
    }
  }

  return status;
};

export const createRealmUserData = async (
  realm: Realm,
  selectedSubjects: string[] | [],
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  const grade = await get_from_localStorage(LocalStorageDataKeys.userGrade);

  const currentDate = new Date().toString();

  realm.write(() => {
    realm.create(LocalObjectDataKeys.UserData, {
      _id: new Realm.BSON.ObjectId(),
      token: null,
      grade: grade.value,
      initialDate: currentDate,
      isSubscribed: false,
      user: null,
      selectedSubjects: [...selectedSubjects],
    });
  });

  navigation.navigate('Home');
};
