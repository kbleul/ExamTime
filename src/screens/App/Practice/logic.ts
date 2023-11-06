import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetExamsMutation} from '../../../reduxToolkit/Services/exams';

type GetRegionsMutationFn = ReturnType<typeof useGetExamsMutation>[0];

export const getPreviousExams = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  getExams: GetRegionsMutationFn,
  setExams: React.Dispatch<React.SetStateAction<never[]>>,
  subject: string,
  grade: string | null,
) => {
  try {
    checkIsOnline(navigator);

    const response: any = await getExams({
      params: {
        grade: grade ? grade : undefined,
        subject,
      },
    }).unwrap();

    setExams(response?.exams);
  } catch (err) {
    console.log('-', err);
  }
};
