import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {useLoginMutation} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';

import {LocalObjectDataKeys} from '../../../../utils/Data/data';
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
      IsDefaultPasswordChanged: boolean;
    },
    'auth/loginSuccess'
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  newUserData: ResultsType<UserData>,
  realm: Realm,
  IsDefaultPasswordChanged: boolean,
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
        IsDefaultPasswordChanged: response.IsDefaultPasswordChanged,
      }),
    );

    updateRealmUserData(
      newUserData,
      response.user,
      response.accessToken,
      realm,
    );

    // Manually reset the controlled inputs
    setChanged && setChanged(prev => !prev);

    response.IsDefaultPasswordChanged
      ? navigator.navigate('Home')
      : navigator.navigate('Password-Reset');
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
    return false;
  }
};

export const updateRealmUserData = (
  newUserData: ResultsType<UserData>,
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
        region,
      } = user;
      let newUser;
      realm.write(() => {
        const newRegion = realm.create(LocalObjectDataKeys.Region, {...region});

        newUser = realm.create(LocalObjectDataKeys.User, {
          id,
          firstName,
          lastName,
          phoneNumber,
          region: newRegion,
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
