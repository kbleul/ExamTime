import NetInfo from '@react-native-community/netinfo';
import {NavigationProp} from '@react-navigation/native';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {Subject, UserData} from '../../../Realm';
import {Dispatch} from 'react';
import {ActionCreatorWithPayload, AnyAction} from '@reduxjs/toolkit';
import {
  useDeleteAccountMutation,
  useLoginMutation,
} from '../../../reduxToolkit/Services/auth';
import {FormData} from '../../../screens/Auth/Login/Types';
import {userType} from '../../../types';
import {logoutSuccess} from '../../../reduxToolkit/Features/auth/authSlice';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];
type DeleteAccountMutationFn = ReturnType<typeof useDeleteAccountMutation>[0];

export const checkIsOnline = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
) => {
  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected || !state.isInternetReachable) {
      navigator.navigate('network-error');
      console.log('error');

      return false;
    } else if (state.isConnected && state.isInternetReachable) {
      return true;
    }
  } catch (error) {
    console.log({error});
    // Handle any errors (e.g., request timeout)
    navigator.navigate('network-error');
    return false; // Assume offline on error
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
  if (savedUserData && savedUserData.length > 0) {
    let newUser = savedUserData[0];

    // const {_id, initialDate, isSubscribed, selectedSubjects, grade} =
    //   savedUserData[0];

    try {
      realm.write(() => {
        newUser.user = null;
        newUser.token = null;
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
  favoritesArray: string[],
  savedSubjects: ResultsType<Subject>,
) => {
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
