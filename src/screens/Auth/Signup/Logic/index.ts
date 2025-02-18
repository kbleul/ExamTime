import {
  useChangePasswordMutation,
  useCreatePasswordMutation,
  useCreateUserMutation,
  useLoginMutation,
  useVerifyCodeMutation,
} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';
import {
  ChangePasswordFormDataType,
  CreatePassworDataType,
  OTPDataType,
  SignupDataType,
  regionItemsType,
  userType,
} from '../../../../types';
import {checkIsOnline} from '../../../../utils/Functions/Helper';

import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateUserMutationFn = ReturnType<typeof useCreateUserMutation>[0];
type VerifyCodeMutationFnMutationFn = ReturnType<
  typeof useVerifyCodeMutation
>[0];
type ResendCodeMutationFn = ReturnType<typeof useLoginMutation>[0];
type CreatePasswordMutationFn = ReturnType<typeof useCreatePasswordMutation>[0];
type ChangePasswordMutationFn = ReturnType<typeof useChangePasswordMutation>[0];
type GetRegionsMutationFn = ReturnType<typeof useLoginMutation>[0];

export const fetchRegions = async (
  getRegions: GetRegionsMutationFn,
  setRegionsListItems: React.Dispatch<
    React.SetStateAction<regionItemsType[] | []>
  >,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
) => {
  try {
    checkIsOnline(navigator);

    const response = await getRegions().unwrap();
    const tempRegionsList: regionItemsType[] = [];

    response.map((region: {region: string}) => {
      tempRegionsList.push({
        label: region.region.toUpperCase(),
        value: region.region,
      });
    });

    setRegionsListItems([...tempRegionsList]);
  } catch (err) {
    console.log(err);
  }
};
export const handleCreateUser = async (
  data: SignupDataType,
  createUser: CreateUserMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  gender: string | null,
  grade: string,
  setGenderError: React.Dispatch<React.SetStateAction<string | null>>,
  region: string | null,
  setRegionError: React.Dispatch<React.SetStateAction<string | null>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>,
  guestUserToken: string | null,
) => {
  if (
    validate_Gender_and_Region(gender, setGenderError, region, setRegionError)
  ) {
    checkIsOnline(navigator);

    try {
      const savedFirebaseToken = await AsyncStorage.getItem('fireBaseToken');

      const response = await createUser({
        ...data,
        phoneNumber: '+251' + data.phoneNumber,
        region: region,
        gender: gender?.toUpperCase(),
        grade,
        fireBaseToken: savedFirebaseToken ? savedFirebaseToken : '',
        guestUserToken: guestUserToken ?? '',
      }).unwrap();

      setUnregisteredUser(response.user);
      //  AsyncStorage.removeItem(LocalStorageDataKeys.userGrade);

      setCurrentStep(prev => ++prev);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        navigator.navigate('network-error');
      }
    }
  }
};

const validate_Gender_and_Region = (
  gender: string | null,
  setGenderError: React.Dispatch<React.SetStateAction<string | null>>,
  region: string | null,
  setRegionError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!gender || !region) {
    !gender && setGenderError('Gender is required');
    !region && setRegionError('Region is required');

    return false;
  }
  return true;
};

export const handleVerfiyCode = async (
  data: OTPDataType,
  isCorrectCode: React.MutableRefObject<boolean>,
  verifyCode: VerifyCodeMutationFnMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>,
) => {
  isCorrectCode.current = true;
  checkIsOnline(navigator);

  try {
    const response = await verifyCode({
      ...data,
    }).unwrap();

    setUnregisteredUser(response.user);
    setCurrentStep(prev => ++prev);
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      navigator.navigate('network-error');
      return;
    }
    isCorrectCode.current = false;
  }
};

export const resendOtp = async (
  unregisteredUser: userType | null,
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>,
  resendCode: ResendCodeMutationFn,
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  isCorrectCode: React.MutableRefObject<boolean>,
  setISResend: React.Dispatch<React.SetStateAction<boolean>>,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  sentOtp: React.MutableRefObject<string>,
) => {
  try {
    checkIsOnline(navigator);

    const response = await resendCode({
      userId: unregisteredUser?.id,
    }).unwrap();
    if (unregisteredUser) {
      const newUser = {
        ...unregisteredUser,
        verificationCode: response?.user?.verificationCode.toString(),
      };
      setUnregisteredUser({...newUser});
    } else {
      setUnregisteredUser({...response.user});
    }

    setOtpValues(['', '', '', '', '']);
    sentOtp.current = '     ';
    setTimer(60);
    isCorrectCode.current = true;
    setISResend(prev => !prev);
  } catch (error: any) {
    console.error('Error submitting form:', error);
  }
};

export const createNewPassword = async (
  data: CreatePassworDataType,
  createPassword: CreatePasswordMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  try {
    checkIsOnline(navigator);

    await createPassword({
      ...data,
    }).unwrap();

    navigator.navigate('signup-success');
    setCurrentStep(1);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

export const changeUserPassword = async (
  data: ChangePasswordFormDataType,
  changePassword: ChangePasswordMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  try {
    checkIsOnline(navigator);
    const savedFirebaseToken = await AsyncStorage.getItem('fireBaseToken');

    await changePassword({
      ...data,
      fireBaseToken: savedFirebaseToken ? savedFirebaseToken : '',
    }).unwrap();

    navigator.navigate('signup-success');
    setCurrentStep(1);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
