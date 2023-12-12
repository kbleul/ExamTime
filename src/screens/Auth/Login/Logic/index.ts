import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {useLoginMutation} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';

import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
} from '../../../../utils/Data/data';
import {UserData} from '../../../../Realm';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';

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
  setChanged: React.Dispatch<React.SetStateAction<boolean>>,
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
    console.log(error);
    return false;
  }
};

export const updateRealmUserData = async (
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
        gender,
        email,
        verificationCode,
        region,
        profilePicture,
      } = user;
      let newUser;

      const grade = await getObject_from_localStorage(
        LocalStorageDataKeys.userGrade,
      );

      let newGrade;

      realm.write(() => {
        const newRegion = realm.create(LocalObjectDataKeys.Region, {...region});

        newGrade = realm.create('Grade', {
          id: grade.value.id,
          grade: grade.value.grade,
          createdAt: grade.value.createdAt,
          updatedAt: grade.value.updatedAt,
        });

        newUser = realm.create(LocalObjectDataKeys.User, {
          id,
          firstName,
          lastName,
          phoneNumber,
          region: newRegion,
          isVerified: false,
          isActive: true,
          grade: newGrade,
          gender,
          email,
          verificationCode: verificationCode ? verificationCode : null,
          profilePicture,
        });
        newUserData.user = newUser;
        newUserData.token = token;
        newUserData.grade = newGrade;
      });
    }
  } catch (e) {
    console.log('err', e);
  }
};
