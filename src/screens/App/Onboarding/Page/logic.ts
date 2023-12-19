import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {useGetGradeMutation} from '../../../../reduxToolkit/Services/grade';
import {gradeType, subjectType} from '../../../../types';
import {useGetSubjectMutation} from '../../../../reduxToolkit/Services/auth';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import {LocalStorageDataKeys} from '../../../../utils/Data/data';
import {createRealmSubjectsData} from '../Logic';
import {Subject} from '../../../../Realm';

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
  setSelectedSubject?: React.Dispatch<React.SetStateAction<
    subjectType | Subject | null
  > | null> | null,
  setIsLoadingSubjectsRealm?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  checkIsOnline(navigator);
  try {
    const getSavedGrade = await getObject_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    const grade = getSavedGrade.value.grade;
    const response = await getSubject({grade}).unwrap();

    const subjects = response.subjects;

    setSubjectsArray(subjects);
    setSelectedSubject && setSelectedSubject(subjects[0]);

    const downloadedSubjects = await downloadIcons(subjects);

    setIsLoadingSubjectsRealm
      ? createRealmSubjectsData(
          realm,
          downloadedSubjects,
          setIsLoadingSubjectsRealm,
        )
      : createRealmSubjectsData(realm, downloadedSubjects);
  } catch (e) {
    console.log(e);
  }
};

export const downloadIcons = async (subjects: subjectType[]) => {
  const downloadPromises = subjects.map(async subject => {
    if (subject.icon && subject.icon !== '') {
      try {
        const response = await fetch(subject.icon);
        if (!response.ok) {
          throw new Error(
            `Error downloading icon: ${response.status} ${response.statusText}`,
          );
        }

        const iconData = await response.text(); // Binary data of the downloaded icon

        return {...subject, icon: iconData};
      } catch (error) {
        console.log(
          `Error downloading/saving icon for subject ${subject.id}:`,
          error,
        );
      }
    }
    return subject;
  });

  const newSubjects = await Promise.all(downloadPromises);
  return newSubjects;
};
