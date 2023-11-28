import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetStudyMutation} from '../../../reduxToolkit/Services/auth';
import {examQuestionType, pdfType, studyType, videoType} from '../../../types';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {Study} from '../../../Realm';

type StudyMutationFn = ReturnType<typeof useGetStudyMutation>[11];

export const getAllStudies = async (
  getStudy: StudyMutationFn,
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  token: string | null,
  realm: Realm,
  Toast: any,
) => {
  if (token) {
    checkIsOnline(navigator);

    try {
      const response = await getStudy({
        token,
      }).unwrap();
      saveStudyToRealm(realm, response.studies, Toast);
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        navigator.navigate('network-error');
      }

      Toast.show({
        type: 'error',
        text1: 'Error fetching studeies',
      });
      return false;
    }
  }
};

export const saveStudyToRealm = async (
  realm: Realm,
  studies: studyType[] | [],
  Toast: any,
) => {
  try {
    studies.forEach(study => {
      const {
        id,
        title,
        objective,
        isPublished,
        createdAt,
        updatedAt,
        grade,
        subject,
        year,
        unit,
        section,
        selectedQuestion,
        pdf,
        videoLink,
      } = study;

      const yearString = year.year;
      const unitString = unit.unit;
      const sectionString = section.section;

      realm.write(() => {
        const subjectObject = realm.create(LocalObjectDataKeys.SingleSubject, {
          id: subject.id,
          subject: subject.subject,
          createdAt: subject.createdAt,
          updatedAt: subject.updatedAt,
        });

        const gradeObject = realm.create(LocalObjectDataKeys.Grade, {
          id: grade.id,
          grade: grade.grade,
          createdAt: grade.createdAt,
          updatedAt: grade.updatedAt,
        });

        const examQuestionArr: examQuestionType[] = [];
        const pdfObjArr: pdfType[] = [];
        const videoObjArr: videoType[] = [];

        selectedQuestion.forEach(question => {
          let {
            id: qId,
            number,
            questionType,
            question: questionText,
            A,
            B,
            C,
            D,
            answer,
            description,
            createdAt: qCreatedAt,
            updatedAt: qUpdatedAt,
          } = question;

          const questiontObject = realm.create(
            LocalObjectDataKeys.ExamQuestion,
            {
              id: qId,
              number,
              questionType,
              question: questionText,
              A,
              B,
              C,
              D,
              answer,
              description,
              createdAt: qCreatedAt,
              updatedAt: qUpdatedAt,
            },
          );

          examQuestionArr.push(questiontObject);
        });

        pdf.forEach(pdfItem => {
          const {id: pdfId, pdfDocument} = pdfItem;
          const pdfObject = realm.create(LocalObjectDataKeys.Pdf, {
            id: pdfId,
            pdfDocument,
          });

          pdfObjArr.push(pdfObject);
        });

        videoLink.forEach(videoItem => {
          const {id: videoId, videoLink} = videoItem;

          const videoObject = realm.create(LocalObjectDataKeys.VideoLink, {
            id: videoId,
            videoLink,
          });

          videoObjArr.push(videoObject);
        });

        realm.create(LocalObjectDataKeys.Study, {
          id,
          title,
          objective,
          isPublished,
          createdAt,
          updatedAt,
          grade: gradeObject,
          subject: subjectObject,
          year: yearString,
          unit: unitString,
          section: sectionString,
          selectedQuestion: examQuestionArr,
          progress: 0,
          pdf: pdfObjArr,
          videoLink: videoObjArr,
          userExamAnswers: [],
        });
      });
    });
  } catch (err) {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: 'Error saving studies for offline use',
    });
  }
};

export const calculateProgress = (studyObj: Study[]) => {
  const prepareProgressArr = studyObj.map(item => item.progress);
  // Perform calculations or further operations with prepareProgressArr if needed
  const singleStudyPrecentage = 100 / studyObj.length;

  let totalPreogress = 0;
  prepareProgressArr.forEach(item => {
    if (item !== 0) {
      totalPreogress += (item * singleStudyPrecentage) / 100;
    }
  });
  return totalPreogress;
};
