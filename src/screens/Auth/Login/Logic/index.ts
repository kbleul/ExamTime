import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {useLoginMutation} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';
import {
  setObject_to_localStorage,
  set_to_localStorage,
} from '../../../../utils/Functions/Set';
import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
} from '../../../../utils/Data/data';
import {UserData} from '../../../../Realm';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];

export const handleLogin = async (
  data: FormData,
  dispatch: Dispatch<AnyAction>,
  login: LoginMutationFn,
  loginSuccess: ActionCreatorWithPayload<
    {
      user: userType;
      token: string;
      isSubscribed: boolean;
    },
    'auth/loginSuccess'
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  newUserData: ResultsType<UserData>,
  savedUserData: ResultsType<UserData>,
  realm: Realm,
) => {
  checkIsOnline(navigator);

  try {
    const response = await login({
      phoneNumber: '+251' + data.phoneNumber,
      password: data.password,
    }).unwrap();

    dispatch(
      loginSuccess({
        user: response.user,
        token: response.accessToken,
        isSubscribed: false,
      }),
    );

    updateRealmUserData(
      newUserData,
      savedUserData,
      response.user,
      response.accessToken,
      realm,
    );

    // setObject_to_localStorage(LocalStorageDataKeys.userData, response.user);
    // set_to_localStorage(LocalStorageDataKeys.token, response.accessToken);

    navigator.navigate('Home');
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
  }
};

const updateRealmUserData = (
  newUserData: ResultsType<UserData>,
  savedUserData: ResultsType<UserData>,
  user: userType,
  token: string,
  realm: Realm,
) => {
  try {
    if (newUserData) {
      const {
        id,
        firstName,
        lastName,
        phoneNumber,
        grade,
        gender,
        email,
        verificationCode,
      } = user;

      let newUser;
      realm.write(() => {
        newUser = realm.create(LocalObjectDataKeys.User, {
          id,
          firstName,
          lastName,
          phoneNumber,
          region: '',
          isVerified: false,
          isActive: true,
          grade: grade?.grade,
          gender,
          email,
          verificationCode: verificationCode ? verificationCode : null,
        });
        newUserData.user = newUser;
        newUserData.token = token;
      });
    }
  } catch (e) {
    console.log('err', e);
  }
};
