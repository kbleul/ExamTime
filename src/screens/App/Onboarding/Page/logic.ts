import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../../utils/Functions/Helper';
import {useGetGradeMutation} from '../../../../reduxToolkit/Services/grade';
import {gradeType, subjectType} from '../../../../types';
import {useGetSubjectMutation} from '../../../../reduxToolkit/Services/auth';
import {getObject_from_localStorage} from '../../../../utils/Functions/Get';
import {
  LocalObjectDataKeys,
  LocalStorageDataKeys,
} from '../../../../utils/Data/data';
import {createRealmSubjectsData} from '../Logic';
import {Subject} from '../../../../Realm';

type GetGradesMutationFn = ReturnType<typeof useGetGradeMutation>[0];
type GetSubjectsMutationFn = ReturnType<typeof useGetSubjectMutation>[0];

export const getGradesMutation = async (
  getGrades: GetGradesMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  setGradesArray: React.Dispatch<React.SetStateAction<gradeType[] | null>>,
  realm: Realm,
) => {
  checkIsOnline(navigator);

  try {
    const response: gradeType[] | null = await getGrades({}).unwrap();

    if (response && response.length > 0) {
      setGradesArray(response);
      saveGradesToRealm(response, realm);
    }
  } catch (e) {
    console.log(e);
  }
};

const saveGradesToRealm = (grades: gradeType[], realm: Realm) => {
  const savedGrades = realm.objects(LocalObjectDataKeys.Grade);
  try {
    if (savedGrades && savedGrades.length > 0) {
      realm.write(() => {
        realm.delete(savedGrades);
      });
    }

    for (const gradeItem of grades) {
      const {id, grade, createdAt, updatedAt} = gradeItem;
      realm.write(() => {
        realm.create(LocalObjectDataKeys.Grade, {
          id,
          grade,
          createdAt,
          updatedAt,
        });
      });
    }
  } catch (err) {
    console.error('Error saving grades to Realm', err);
  }
};

export const getSubjectsMutation = async (
  getSubject: GetSubjectsMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  realm: Realm,
  setSubjectsArray?: React.Dispatch<React.SetStateAction<subjectType[] | null>>,
  setSelectedSubject?: React.Dispatch<React.SetStateAction<
    subjectType | Subject | null
  > | null> | null,
  setIsLoadingSubjectsRealm?: React.Dispatch<React.SetStateAction<boolean>>,
  setRelamSaveStatus?: React.Dispatch<React.SetStateAction<number>>,
  isLogin?: boolean,
) => {
  checkIsOnline(navigator);

  try {
    const getSavedGrade = await getObject_from_localStorage(
      LocalStorageDataKeys.userGrade,
    );

    const grade = getSavedGrade.value.grade;

    const response = await getSubject({grade}).unwrap();

    const subjects = response.subjects;

    setSubjectsArray && setSubjectsArray(subjects);
    setSelectedSubject && setSelectedSubject(subjects[0]);

    const downloadedSubjects = setRelamSaveStatus
      ? await downloadIcons(subjects, setRelamSaveStatus)
      : await downloadIcons(subjects, null);

    setIsLoadingSubjectsRealm
      ? createRealmSubjectsData(
          realm,
          downloadedSubjects,
          setIsLoadingSubjectsRealm,
          isLogin ? isLogin : false,
        )
      : createRealmSubjectsData(
          realm,
          downloadedSubjects,
          undefined,
          isLogin ? isLogin : false,
        );
  } catch (e) {
    console.log(e);
  }
};

export const downloadIcons = async (
  subjects: subjectType[],
  setRelamSaveStatus: React.Dispatch<React.SetStateAction<number>> | null,
) => {
  const downloadIcon = async (subject: subjectType) => {
    if (subject.icon && subject.icon !== '') {
      try {
        const response = await fetch(subject.icon);
        if (!response.ok) {
          throw new Error(
            `Error downloading icon: ${response.status} ${response.statusText}`,
          );
        }

        const iconData = await response.text(); // Binary data of the downloaded icon

        setRelamSaveStatus && setRelamSaveStatus(prev => ++prev);
        return {...subject, icon: iconData};
      } catch (error) {
        console.log(
          `Error downloading/saving icon for subject ${subject.id}:`,
          error,
        );
      }
    }

    return subject;
  };

  // Map each subject to a download promise
  const downloadPromises = subjects.map(subject => downloadIcon(subject));

  // Use Promise.all to execute all download promises in parallel
  const newSubjects = await Promise.all(downloadPromises);

  return newSubjects;
};
