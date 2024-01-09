import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {
  useGetSubjectMutation,
  useLoginMutation,
} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';

import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
} from '../../../../utils/Data/data';
import {UserData} from '../../../../Realm';

import {setObject_to_localStorage} from '../../../../utils/Functions/Set';
import {getSubjectsMutation} from '../../../App/Onboarding/Page/logic';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];
type GetSubjectsMutationFn = ReturnType<typeof useGetSubjectMutation>[0];

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
  setChanged: React.Dispatch<React.SetStateAction<boolean>>,
  getSubject: GetSubjectsMutationFn,
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

    setObject_to_localStorage(
      LocalStorageDataKeys.userGrade,
      response.user.grade,
    );

    updateRealmUserData(
      newUserData,
      response.user,
      response.accessToken,
      realm,
    );

    getSubjectsMutation(
      getSubject,
      navigator,
      realm,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
    );

    // Manually reset the controlled inputs
    setChanged && setChanged(prev => !prev);

    response.IsDefaultPasswordChanged
      ? navigator.getState().routeNames[0] === 'Home'
        ? navigator.navigate('Home')
        : navigator.navigate('HomeSection')
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
        firstName,
        lastName,
        phoneNumber,
        gender,
        email,
        verificationCode,
        region,
        profilePicture,
        grade,
      } = user;
      let newUser;

      let newGrade;

      realm.write(() => {
        const newRegion = realm.create(LocalObjectDataKeys.Region, {...region});

        newGrade = realm
          .objects(LocalObjectDataKeys.Grade)
          .filtered(`id = "${grade.id}"`);

        newUser = realm.create(LocalObjectDataKeys.User, {
          id: phoneNumber + firstName,
          firstName,
          lastName,
          phoneNumber,
          region: newRegion,
          isVerified: false,
          isActive: true,
          grade: newGrade[0],
          gender,
          email,
          verificationCode: verificationCode ? verificationCode : null,
          profilePicture,
        });
        newUserData.user = newUser;
        newUserData.token = token;
        newUserData.grade = newGrade[0];
      });
    }
  } catch (e) {
    console.log('Login err', e);
  }
};
