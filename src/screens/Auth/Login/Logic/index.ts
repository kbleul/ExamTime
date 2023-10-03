import {ActionCreatorWithPayload, AnyAction, Dispatch} from '@reduxjs/toolkit';
import {userType} from '../../../../types';
import {isOnline} from '../../../../utils/Functions/Helper';
import {FormData} from '../Types';
import {useLoginMutation} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';

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

    console.log(response.accessToken);
    dispatch(
      loginSuccess({
        user: response.user,
        token: response.accessToken,
      }),
    );
    // No need to manually dispatch loginSuccess here
  } catch (error) {
    console.log(error?.error);
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
    }
  }
};

export const checkIsOnline = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
) => {
  const isonLine = await isOnline();
  console.log(isonLine);
  if (!isonLine) {
    navigator.navigate('network-error');
    return;
  }
};
