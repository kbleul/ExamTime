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
import {LocalStorageDataKeys} from '../../../../utils/Data/data';

type LoginMutationFn = ReturnType<typeof useLoginMutation>[0];

export const handleLogin = async (
  data: FormData,
  dispatch: Dispatch<AnyAction>,
  login: LoginMutationFn,
  loginSuccess: ActionCreatorWithPayload<
    {
      user: userType;
      token: string;
    },
    'auth/loginSuccess'
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
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
      }),
    );

    setObject_to_localStorage(LocalStorageDataKeys.userData, response.user);
    set_to_localStorage(LocalStorageDataKeys.token, response.accessToken);

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
