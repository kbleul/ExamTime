import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetStudyMutation} from '../../../reduxToolkit/Services/auth';

type StudyMutationFn = ReturnType<typeof useGetStudyMutation>[11];

export const getAllStudies = async (
  getStudy: StudyMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  token: string | null,
) => {
  if (token) {
    checkIsOnline(navigator);

    try {
      const response = await getStudy({
        token,
      }).unwrap();

      console.log(response, '-------------------');
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
  }
};
