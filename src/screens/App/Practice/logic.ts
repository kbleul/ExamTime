import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetExamsMutation} from '../../../reduxToolkit/Services/exams';

type GetRegionsMutationFn = ReturnType<typeof useGetExamsMutation>[0];

export const getPreviousExams = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  getExams: GetRegionsMutationFn,
  token: string,
  setExams: React.Dispatch<React.SetStateAction<never[]>>,
  grade: string,
) => {
  try {
    checkIsOnline(navigator);
    const response: any = await getExams({
      token: token,
      params: {
        subject: 'Biology',
      },
    });

    setExams(response?.data?.exams);
  } catch (err) {
    console.log(err);
  }
};
