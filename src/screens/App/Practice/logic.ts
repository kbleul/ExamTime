import {NavigationProp} from '@react-navigation/native';
import {checkIsOnline} from '../../../utils/Functions/Helper';
import {useGetExamsMutation} from '../../../reduxToolkit/Services/exams';
import {LocalObjectDataKeys} from '../../../utils/Data/data';
import {examQuestionType, examType as examTsType} from '../../../types';

type GetRegionsMutationFn = ReturnType<typeof useGetExamsMutation>[0];

export const getPreviousExams = async (
  navigator: NavigationProp<ReactNavigation.RootParamList>,
  getExams: GetRegionsMutationFn,
  setExams: React.Dispatch<React.SetStateAction<[] | examTsType[]>>,
  subject: string,
  grade: string | null,
  realm: Realm,
  selectedExamType: string,
) => {
  try {
    checkIsOnline(navigator);

    const response: any = await getExams({
      params: {
        grade: grade ? grade : undefined,
        subject,
      },
    }).unwrap();

    setExams([
      ...response?.exams.filter(
        (exam: examTsType) =>
          exam.subject.subject === subject &&
          exam.examType === selectedExamType,
      ),
    ]);

    saveExamsToRealmDB(response.exams, realm);
  } catch (err) {
    console.log('-', err);
  }
};

const saveExamsToRealmDB = (exams: examTsType[], realm: Realm) => {
  exams.forEach(exam => {
    try {
      let {
        id,
        examName,
        examType,
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

      const questionsArray: examQuestionType[] = [];

      realm.write(() => {
        year = year.year;

        const subjectObject = realm.create(LocalObjectDataKeys.SingleSubject, {
          ...subject,
        });
        const gradeObject = realm
          .objects(LocalObjectDataKeys.Grade)
          .filtered(`id = "${grade.id}"`);

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
            metadata,
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
              metadata,
              createdAt: qCreatedAt,
              updatedAt: qUpdatedAt,
            },
          );

          questionsArray.push(questiontObject);
        });

        realm.create(LocalObjectDataKeys.Exam, {
          id,
          examName,
          examType,
          duration,
          passingScore,
          noOfQuestions,
          addedQuestions,
          isPublished,
          createdAt,
          updatedAt,
          examQuestion: questionsArray,
          grade: gradeObject[0],
          subject: subjectObject,
          year: year,
          isExamTaken: false,
          lastTaken: null,
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
};
