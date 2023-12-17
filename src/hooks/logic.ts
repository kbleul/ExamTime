import {Exam, ExamAnswers, UserExamAnswers} from '../Realm';
import {useGetExamAnswersMutation} from '../reduxToolkit/Services/auth';
import {examType} from '../types';
import {LocalObjectDataKeys} from '../utils/Data/data';

type ExamAnswersMutationFn = ReturnType<typeof useGetExamAnswersMutation>[0];

type responseType = {
  id: string;
  examDate: string;
  examId: examType;
  userAnswers: {
    [id: string]: 'A' | 'B' | 'C' | 'D';
  }[];
};
export const getExamAnswersFromDB = async (
  getExamAnswers: ExamAnswersMutationFn,
  token: string | null,
  realm: Realm,
) => {
  if (token) {
    try {
      const response: any = await getExamAnswers({
        token,
      }).unwrap();

      const answers: responseType[] = response?.examResult;
      saveDataToRealm(answers, realm);
    } catch (error) {
      console.error(error);
    }
  }
};

const saveDataToRealm = (ansersFromDB: responseType[], realm: Realm) => {
  // Use the retrieved data

  for (const exam of ansersFromDB) {
    const savedExamObject = realm
      .objects(Exam)
      .filtered(`id = "${exam.examId.id}"`);

    // Convert Realm objects to regular JavaScript objects
    const savedExam = Array.from(savedExamObject);

    const userAnswersObject: UserExamAnswers[] = [];

    //check if sync is unnecessary
    if (
      savedExam.length > 0 &&
      savedExam[0].isExamTaken === false &&
      savedExam[0].examQuestion &&
      savedExam[0].examQuestion.length > 0
    ) {
      for (const [useAnserIndex, userAnswer] of exam.userAnswers.entries()) {
        const userAnswerKey = Object.keys(userAnswer)[0];
        const foundQuestion = savedExam[0].examQuestion.find(
          question => question.id === userAnswerKey,
        );

        if (foundQuestion) {
          try {
            realm.write(() => {
              const newUserAnswer: UserExamAnswers = realm.create(
                LocalObjectDataKeys.UserExamAnswers,
                {
                  id: foundQuestion.id,
                  index: useAnserIndex,
                  userAnswer: userAnswer[userAnswerKey],
                  correctAnswer: foundQuestion.answer,
                },
              );
              userAnswersObject.push(newUserAnswer);
            });
          } catch (err) {
            console.error(
              'Error creaating exam answers on get syned data',
              err,
            );
          }
        }
      }
    }

    if (userAnswersObject.length > 0) {
      try {
        realm.write(() => {
          realm.create(LocalObjectDataKeys.ExamAnswers, {
            examId: savedExamObject[0].id,
            examDate: exam.examDate,
            userExamAnswers: userAnswersObject,
          });

          savedExamObject[0].isExamTaken = true;
        });
      } catch (err) {}
    }
  }
};
