import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {useGetGradeMutation} from '../../../../reduxToolkit/Services/grade';
import {gradeType} from '../../../../types';

type GetGradesMutationFn = ReturnType<typeof useGetGradeMutation>[0];

export const getGradesMutation = async (
  getGrades: GetGradesMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setGradesArray: React.Dispatch<React.SetStateAction<gradeType[] | null>>,
) => {
  checkIsOnline(navigator);

  try {
    const response = await getGrades({}).unwrap();
    setGradesArray(response);
  } catch (e) {
    console.log(e);
  }
};
