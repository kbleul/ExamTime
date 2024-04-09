import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
  trialStatus,
} from '../../../../utils/Data/data';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import Realm from 'realm';
import {subjectType} from '../../../../types';
import {
  useCreteGuestUserMutation,
  useGetStudyMutation,
  useGetTrialTimesMutation,
} from '../../../../reduxToolkit/Services/auth';
import uuid from 'react-native-uuid';
import {UserData} from '../../../../Realm';
import {getAllStudies} from '../../Study/logic';
import {ToastProps} from 'react-native-toast-message';

type CreateGuestMutationFn = ReturnType<typeof useCreteGuestUserMutation>[0];
type GetStudyMutationFn = ReturnType<typeof useGetStudyMutation>[0];
type GetTrialDaytsMutationFn = ReturnType<typeof useGetTrialTimesMutation>[0];

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
  setIsLoadingSubjects: React.Dispatch<React.SetStateAction<boolean>>,
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>,
  creteGuestUser: CreateGuestMutationFn,
  getTrialTimes: GetTrialDaytsMutationFn,
  getStudy: GetStudyMutationFn,
  navigator: any,
  Toast: (props: ToastProps) => JSX.Element,
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
        allowedTrialDays: 0,
        allowedTrialDays_AfterLogin: 0,
        guestUserToken: null,
      });
    });

    const guestUserToken: string | null = await createGuestUserUniqueId(
      creteGuestUser,
      getTrialTimes,
      grade.value.grade,
      realm,
    );

    guestUserToken &&
      (await getAllStudies(getStudy, navigator, guestUserToken, realm, Toast));
    setShowOnboarding(false);
  } catch (err) {
    console.log(err);
    setIsLoadingSubjects(false);
  }
};

export const createRealmSubjectsData = async (
  realm: Realm,
  subjects: subjectType[],
  setIsLoadingSubjectsRealm?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | null
    | undefined,
  isLogin?: boolean,
) => {
  const savedSubjects = realm.objects(LocalObjectDataKeys.Subject);
  const userData: any = realm.objects(LocalObjectDataKeys.UserData);
  //remove previous saved subjects

  try {
    realm.write(() => {
      realm.delete(savedSubjects);

      if (isLogin) {
        userData[0].selectedSubjects = [];
      }
    });
  } catch (err) {
    console.log('Remove previous saved subjects', err);
  }

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
          guestUserToken: null,
        });
      });
    });
    setIsLoadingSubjectsRealm && setIsLoadingSubjectsRealm(false);
  } catch (err) {
    console.log('Error saving new subjects', err);
  }
};

const createGuestUserUniqueId = async (
  creteGuestUser: CreateGuestMutationFn,
  getTrialTimes: GetTrialDaytsMutationFn,
  grade: string,
  realm: Realm,
): Promise<string | null> => {
  const userData = realm.objects(UserData);

  try {
    const savedFirebaseToken = await AsyncStorage.getItem('fireBaseToken');

    const deviceId = uuid.v4();
    const response: any = await creteGuestUser({
      grade,
      deviceId,
      fireBaseToken: savedFirebaseToken ? savedFirebaseToken : '',
    }).unwrap();

    if (response) {
      const responseTrial: any = await getTrialTimes({}).unwrap();

      const totalTrialTime: number = responseTrial.guestUserDuration.duration;
      const totalTrialTime_afterLogin: number =
        responseTrial.unsubscribedUserDuration.duration;

      try {
        realm.write(() => {
          userData[0].deviceId = deviceId.toString();
          userData[0].allowedTrialDays = totalTrialTime;
          userData[0].allowedTrialDays_AfterLogin = totalTrialTime_afterLogin;

          userData[0].guestUserToken = response.accessToken;

          return response.accessToken;
        });
      } catch (err) {
        console.log('Error getting trial days', err);
        return null;
      }
    }

    return null;
  } catch (e) {
    console.log('Error on create guest user', e);
    return null;
  }
};
