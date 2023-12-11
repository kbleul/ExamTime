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
  console.log('========================', 'gate opend');

  for (const exam of ansersFromDB) {
    console.log(exam);
    const savedExamObject = realm
      .objects(Exam)
      .filtered(`id = "${exam.examId.id}"`);

    // Convert Realm objects to regular JavaScript objects
    const savedExam = Array.from(savedExamObject);

    const userAnswersObject: UserExamAnswers[] = [];
    console.log('========================', 'up and running', savedExam);

    //check if sync is unnecessary
    if (
      savedExam.length > 0 &&
      savedExam[0].isExamTaken === false &&
      savedExam[0].examQuestion
    ) {
      console.log('========================', 'made it');

      for (const [
        questionIndex,
        question,
      ] of savedExam[0].examQuestion.entries()) {
        console.log('========================', 'omg');

        const userAnswer = exam.userAnswers.find(
          answer => answer.id === question.id,
        );
        const userAnswerKey = userAnswer ? Object.keys(userAnswer)[0] : null;

        const correctAnswer = question.answer;

        if (userAnswer && userAnswerKey) {
          console.log('========================', 'almost there');

          try {
            realm.write(() => {
              const newUserAnswer: UserExamAnswers = realm.create(
                LocalObjectDataKeys.UserExamAnswers,
                {
                  id: question.id,
                  index: questionIndex,
                  userAnswer: userAnswer[userAnswerKey],
                  correctAnswer,
                },
              );
              console.log('========================', 'hell yaa');

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
          console.log('========================', 'God did');

          const newExamAnswer = realm.create(LocalObjectDataKeys.ExamAnswers, {
            examId: exam.id,
            examDate: exam.examDate,
            userAnswer: userAnswersObject,
          });

          savedExamObject[0].isExamTaken = true;
          console.log('newExamAnswer', newExamAnswer);
        });
      } catch (err) {}
    }
  }
};
