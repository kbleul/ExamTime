import {useLoginMutation} from '../../../../reduxToolkit/Services/auth';
import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../../../utils/Functions/Helper';
import {SignupDataType, userType} from '../../../../../types';
import {get_from_localStorage} from '../../../../../utils/Functions/Get';
import {LocalStorageDataKeys} from '../../../../../utils/Data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateUserMutationFn = ReturnType<typeof useLoginMutation>[1];

export const handleCreateUser = async (
  data: SignupDataType,
  createUser: CreateUserMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  gender: string | null,
  setGenderError: React.Dispatch<React.SetStateAction<string | null>>,
  region: string | null,
  setRegionError: React.Dispatch<React.SetStateAction<string | null>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>,
) => {
  if (
    validate_Gender_and_Region(gender, setGenderError, region, setRegionError)
  ) {
    checkIsOnline(navigator);

    const userGrade = await get_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    try {
      const response = await createUser({
        ...data,
        phoneNumber: '+251' + data.phoneNumber,
        region: region?.toLowerCase(),
        gender: gender?.toUpperCase(),
        grade: userGrade?.value,
      }).unwrap();

      console.log(';;', response);

      setUnregisteredUser(response.user);
      AsyncStorage.removeItem(LocalStorageDataKeys.userGrade);

      setCurrentStep(prev => ++prev);

      //   setCurrentStep(prev => ++prev);
      //   setUnregisteredUser(response.user);
    } catch (error) {
      console.log('pppp', error);
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
  data: SignupDataType,
  createUser: CreateUserMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  gender: string | null,
  setGenderError: React.Dispatch<React.SetStateAction<string | null>>,
  region: string | null,
  setRegionError: React.Dispatch<React.SetStateAction<string | null>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>,
) => {
  if (
    validate_Gender_and_Region(gender, setGenderError, region, setRegionError)
  ) {
    checkIsOnline(navigator);

    const userGrade = await get_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    try {
      const response = await createUser({
        ...data,
        phoneNumber: '+251' + data.phoneNumber,
        region: region?.toLowerCase(),
        gender: gender?.toUpperCase(),
        grade: userGrade?.value,
      }).unwrap();

      console.log(';;', response);

      setUnregisteredUser(response.user);
      setCurrentStep(prev => ++prev);

      //   AsyncStorage.removeItem(LocalStorageDataKeys.userGrade);
      //   setCurrentStep(prev => ++prev);
      //   setUnregisteredUser(response.user);
    } catch (error) {
      console.log('pppp', error);
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        navigator.navigate('network-error');
      }
    }
  }
};
