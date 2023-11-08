import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {useGetGradeMutation} from '../../../../reduxToolkit/Services/grade';
import {gradeType, subjectType} from '../../../../types';
import {useGetSubjectMutation} from '../../../../reduxToolkit/Services/auth';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import {LocalStorageDataKeys} from '../../../../utils/Data/data';
import {createRealmSubjectsData} from '../Logic';

type GetGradesMutationFn = ReturnType<typeof useGetGradeMutation>[0];
type GetSubjectsMutationFn = ReturnType<typeof useGetSubjectMutation>[0];

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

export const getSubjectsMutation = async (
  getSubject: GetSubjectsMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setSubjectsArray: React.Dispatch<React.SetStateAction<subjectType[] | null>>,
  realm: Realm,
) => {
  checkIsOnline(navigator);
  console.log('kkkkk');
  try {
    const getSavedGrade = await getObject_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    const grade = getSavedGrade.value.grade;
    const response = await getSubject({grade}).unwrap();

    const subjects = response.subjects;

    setSubjectsArray(subjects);

    createRealmSubjectsData(realm, subjects);
  } catch (e) {
    console.log(e);
  }
};
