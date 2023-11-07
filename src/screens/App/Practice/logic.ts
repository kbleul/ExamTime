import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetExamsMutation} from '../../../reduxToolkit/Services/exams';
import {examQuestionType, examType} from '../../../types';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {ExamQuestion} from '../../../Realm';

type GetRegionsMutationFn = ReturnType<typeof useGetExamsMutation>[0];

export const getPreviousExams = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  getExams: GetRegionsMutationFn,
  setExams: React.Dispatch<React.SetStateAction<[] | examType[]>>,
  subject: string,
  grade: string | null,
  realm: Realm,
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

    saveExamsToRealmDB(response.exams, realm);
  } catch (err) {
    console.log('-', err);
  }
};

const saveExamsToRealmDB = (exams: examType[], realm: Realm) => {
  exams.forEach(exam => {
    try {
      let {
        id,
        examName,
        duration,
        passingScore,
        noOfQuestions,
        addedQuestions,
        isPublished,
        createdAt,
        updatedAt,
        examQuestion,
        grade,
        subject,
        year,
      } = exam;

      const questionsArray: any[] = [];

      realm.write(() => {
        year = year.year;

        const subjectObject = realm.create(LocalObjectDataKeys.SingleSubject, {
          ...subject,
        });
        const gradeObject = realm.create(LocalObjectDataKeys.Grade, {
          ...grade,
        });

        examQuestion.forEach(question => {
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

          questionsArray.push(questiontObject);
        });

        const newExam = realm.create(LocalObjectDataKeys.Exam, {
          id,
          examName,
          duration,
          passingScore,
          noOfQuestions,
          addedQuestions,
          isPublished,
          createdAt,
          updatedAt,
          examQuestion: questionsArray,
          grade: gradeObject,
          subject: subjectObject,
          year: year,
          userExamAnswers: [],
          type: 'Previous',
          isExamTaken: false,
        });

        console.log({newExam});
      });
    } catch (err) {
      console.log(err);
    }
  });
};
