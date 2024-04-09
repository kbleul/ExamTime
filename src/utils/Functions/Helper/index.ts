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
  Challange,
  Exam,
  ExamAnswers,
  Pdf,
  Study,
  Subject,
  UserData,
  UserExamAnswers,
  VideoLink,
} from '../../../Realm';
import {Dispatch} from 'react';
import {ActionCreatorWithPayload, AnyAction} from '@reduxjs/toolkit';
import {
  useDeleteAccountMutation,
  useLoginMutation,
  useMakeBankPaymentMutation,
} from '../../../reduxToolkit/Services/auth';
import {FormData} from '../../../screens/Auth/Login/Types';
import {subjectType, userType} from '../../../types';
import {logoutSuccess} from '../../../reduxToolkit/Features/auth/authSlice';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];
type DeleteAccountMutationFn = ReturnType<typeof useDeleteAccountMutation>[0];
type MakeBankPaymentMutationFn = ReturnType<
  typeof useMakeBankPaymentMutation
>[0];

export const checkIsOnline = async (navigator?: any) => {
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
  removeAllData: boolean,
) => {
  if (savedUserData && savedUserData.length > 0) {
    try {
      realm.write(() => {
        const token = savedUserData[0].token;
        const userData = savedUserData[0].user;

        console.log({token});

        savedUserData[0].token = null;
        savedUserData[0].isSubscribed = false;
        savedUserData[0].user = null;

        if (!removeAllData) {
          savedUserData[0].loggedOutUser = userData;
          savedUserData[0].loggedOutUserToken = token;

          deleteAllSavedRealmData(realm, savedUserData);
        } else {
          console.log('here', {token});

          savedUserData[0].loggedOutUser = null;
          savedUserData[0].loggedOutUserToken = null;
        }
      });
    } catch (e) {
      console.log('err', e);
    }
  }
};

export const deleteAllSavedRealmData = (
  realm: Realm,
  savedUserData: ResultsType<UserData>,
) => {
  const savedExamsAnswers = realm.objects(ExamAnswers);
  const savedUserExamAnswers = realm.objects(UserExamAnswers);

  const savedExam = realm.objects(Exam);

  const savedPdf = realm.objects(Pdf);
  const savedvideo = realm.objects(VideoLink);
  const savedSubject = realm.objects(Subject);

  const savedStudies = realm.objects(Study);
  const savedChallanges = realm.objects(Challange);

  if (savedUserData && savedUserData.length > 0) {
    try {
      realm.delete(savedExamsAnswers);
      realm.delete(savedUserExamAnswers);

      for (const exam of savedExam) {
        exam.isExamTaken = false;
        exam.lastTaken = null;
      }

      for (const pdf of savedPdf) {
        pdf.isViewed = false;
      }

      for (const video of savedvideo) {
        video.isViewed = false;
      }

      for (const study of savedStudies) {
        study.progress = 0;
        study.userExamAnswers = [];
      }

      for (const challenge of savedChallanges) {
        challenge.progress = 0;
        challenge.finishedItems = [];
      }

      for (const study of savedSubject) {
        study.progress = 0;
      }
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
    setShowLastPrompt(false);
    setShowLDeleteDialog(false);

    await Toast.show({
      type: 'success',
      text1: 'success',
      text2: 'Account deleted successfully',
      visibilityTime: 4000,
    });

    removeRealmUserData(realm, savedUserData, true);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutSuccess());

    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    } else if (error.data && error.originalStatus) {
      setShowLastPrompt(false);
      setShowLDeleteDialog(false);

      await Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'Account deleted successfully',
        visibilityTime: 4000,
      });

      removeRealmUserData(realm, savedUserData, true);
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

export const handleBankPayment = async (
  makeBankPayment: MakeBankPaymentMutationFn,
  depositedByName: string,
  referenceNo: string,
  bankName: string,
  token: string | null,
  subscriptionPackageId: string,
  navigator: any,
  Toast: any,
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>,
  setRefrenceNumber: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (token) {
    try {
      await makeBankPayment({
        depositedByName,
        referenceNo,
        subscriptionPackageId,
        bankName,
        token,
      }).unwrap();

      setRefrenceNumber(referenceNo);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.log(error);
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        navigator.navigate('network-error');
      }

      if (error.data && error.data.statusCode === 409) {
        error.data.message &&
          Toast.show({
            type: 'error',
            text1: error.data.message,
            text2: 'Try a different refrence number',
          });
      }
    }
  }
};
