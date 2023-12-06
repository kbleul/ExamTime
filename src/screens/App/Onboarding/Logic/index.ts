import {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
  trialStatus,
} from '../../../../utils/Data/data';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import Realm from 'realm';
import {downloadedSubjectType, subjectType} from '../../../../types';

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
  setIsLoadingSubjects: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setIsLoadingSubjects(true);
    const grade = await getObject_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

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
  } catch (err) {
    console.log(err);
    setIsLoadingSubjects(false);
  }

  navigation.navigate('Home');
};

export const createRealmSubjectsData = async (
  realm: Realm,
  subjects: subjectType[],
) => {
  try {
    subjects.forEach(subject => {
      const {
        id,
        description,
        icon,
        createdAt,
        updatedAt,
        grade,
        subject: SingleSubject,
      } = subject;

      realm.write(() => {
        const subjectObject = realm.create(LocalObjectDataKeys.SingleSubject, {
          id: SingleSubject.id,
          subject: SingleSubject.subject,
          createdAt: SingleSubject.createdAt,
          updatedAt: SingleSubject.updatedAt,
        });

        realm.create(LocalObjectDataKeys.Subject, {
          id,
          description,
          icon,
          createdAt,
          updatedAt,
          grade,
          subject: subjectObject,
          progress: 0,
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};
