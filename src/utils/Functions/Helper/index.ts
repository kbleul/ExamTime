import NetInfo from '@react-native-community/netinfo';
import {NavigationProp} from '@react-navigation/native';
import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Share,
} from 'react-native';
import {Platform} from 'react-native';
import {
  Exam,
  ExamAnswers,
  Subject,
  UserData,
  UserExamAnswers,
} from '../../../Realm';
import {Dispatch} from 'react';
import {ActionCreatorWithPayload, AnyAction} from '@reduxjs/toolkit';
import {
  useDeleteAccountMutation,
  useLoginMutation,
} from '../../../reduxToolkit/Services/auth';
import {FormData} from '../../../screens/Auth/Login/Types';
import {subjectType, userType} from '../../../types';
import {logoutSuccess} from '../../../reduxToolkit/Features/auth/authSlice';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];
type DeleteAccountMutationFn = ReturnType<typeof useDeleteAccountMutation>[0];

export const checkIsOnline = async (navigator?: any) => {
  if (Platform.OS === 'ios') {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 5000); // Set a timeout of 5 seconds

      const response = await fetch('https://www.google.com', {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeout); // Clear the timeout if the request completes within 5 seconds

      if (response.status === 200) {
        return true;
      } else {
        console.log('Failed to reach the internet server');
        navigator && navigator.navigate('network-error');
        return false;
      }
    } catch (error) {
      console.log({error});
      console.log('Failed to reach the internet server');

      navigator && navigator.navigate('network-error');
      return false;
    }
  } else if (Platform.OS === 'android') {
    try {
      const state = await NetInfo.fetch();

      if (!state.isConnected || !state.isInternetReachable) {
        navigator && navigator.navigate('network-error');
        console.log('Failed to reach the internet server');

        return false;
      } else if (state.isConnected && state.isInternetReachable) {
        return true;
      }
    } catch (error) {
      console.log({error});
      console.log('Failed to reach the internet server');

      // Handle any errors (e.g., request timeout)
      navigator && navigator.navigate('network-error');
      return false; // Assume offline on error
    }
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

export const removeRealmUserData = async (
  realm: Realm,
  savedUserData: ResultsType<UserData>,
) => {
  const savedExamsAnswers = realm.objects(ExamAnswers);
  const savedUserExamAnswers = realm.objects(UserExamAnswers);

  const savedExam = realm.objects(Exam);

  if (savedUserData && savedUserData.length > 0) {
    // const {_id, initialDate, isSubscribed, selectedSubjects, grade} =
    //   savedUserData[0];

    try {
      realm.write(() => {
        realm.delete(savedExamsAnswers);
        realm.delete(savedUserExamAnswers);

        for (const exam of savedExam) {
          exam.isExamTaken = false;
        }

        savedUserData[0].token = null;
        savedUserData[0].isSubscribed = false;
        savedUserData[0].user = null;
        savedUserData[0].selectedSubjects = [];
      });
    } catch (e) {
      console.log('err', e);
    }
  }
};

export const verifyPassword = async (
  data: FormData,
  dispatch: Dispatch<AnyAction>,
  login: LoginMutationFn,
  loginSuccess: ActionCreatorWithPayload<
    {
      user: userType;
      token: string;
      isSubscribed: boolean;
      IsDefaultPasswordChanged: boolean;
    },
    'auth/loginSuccess'
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setShowLastPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>,
  setUserPassword: React.Dispatch<React.SetStateAction<string>>,
  IsDefaultPasswordChanged: boolean,
) => {
  checkIsOnline(navigator);

  try {
    const response = await login({
      phoneNumber: data.phoneNumber,
      password: data.password,
    }).unwrap();
    dispatch(
      loginSuccess({
        user: response.user,
        token: response.accessToken,
        isSubscribed: false,
        IsDefaultPasswordChanged: response.IsDefaultPasswordChanged,
      }),
    );

    setShowLastPrompt(true);
    setShowPasswordForm(false);
    setUserPassword(data.password);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
  }
};

export const DeleteUserAccount = async (
  password: string,
  token: string,
  dispatch: Dispatch<AnyAction>,
  deleteAccount: DeleteAccountMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setShowLastPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setShowLDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>,
  realm: Realm,
  savedUserData: ResultsType<UserData>,
  Toast: any,
) => {
  checkIsOnline(navigator);

  try {
    await deleteAccount({
      password,
      token,
    }).unwrap();
    dispatch(logoutSuccess());
    setShowLastPrompt(false);
    setShowLDeleteDialog(false);

    await Toast.show({
      type: 'success',
      text1: 'success',
      text2: 'Account deleted successfully',
      visibilityTime: 4000,
    });

    removeRealmUserData(realm, savedUserData);
  } catch (error) {
    dispatch(logoutSuccess());

    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
    console.log(error);
  }
};

export const PushFavorateToFront = (
  favoritesArray: string[] | null | undefined,
  savedSubjects: ResultsType<Subject> | subjectType[],
) => {
  if (!favoritesArray) {
    return savedSubjects;
  }

  if (!savedSubjects) return null;

  const favorites: Subject[] = [];

  favoritesArray.map(item => {
    const favSubject = savedSubjects.find(
      (subject: any) => subject.id === item,
    );
    favSubject && favorites.push(favSubject);
  });

  const notFavorites = savedSubjects.filter(
    (item: any) => !favoritesArray.includes(item.id),
  );

  const favoritesFirstArray = [...favorites, ...notFavorites];

  return favoritesFirstArray;
};

export const isHtml = (input: string) => {
  const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  return htmlRegex.test(input);
};

export const handleShare = async () => {
  try {
    const appLink =
      'https://play.google.com/store/apps/details?id=com.exam_time.exam';
    const message = `Download ExamTime from playstore: ${appLink}`;

    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
