import {Exam, ExamAnswers} from '../../../Realm';
import {answersType} from '../../../screens/App/PracticeQuestion';

export const getHighScoreExam = (
  realm: Realm,
): {
  exam: Exam;
  userAnswer: answersType[];
  score: number;
} | null => {
  const exams = realm.objects(Exam).filtered('isExamTaken = true');

  let highScoreExam = null;

  for (const exam of exams) {
    const examAnswers = realm
      .objects(ExamAnswers)
      .filtered(`examId = "${exam.id}"`);

    for (const examAnswer of examAnswers) {
      const userAnswer = examAnswer.userExamAnswers;

      const score = calculateUserAnswer(
        userAnswer,
        exam.examQuestion ? exam.examQuestion.length : 0,
      );

      if (!highScoreExam) {
        highScoreExam = {
          exam,
          userAnswer,
          score: Math.round(score),
        };
        break;
      }
      if (score > highScoreExam.score) {
        highScoreExam = {
          exam,
          userAnswer,
          score: Math.round(score),
        };
      }
    }
  }

  return highScoreExam;
};

const calculateUserAnswer = (
  userAnswer: answersType[],
  examQuestionsLength: number,
): number => {
  let correctAnswers = 0;
  userAnswer.forEach((answer: answersType) => {
    if (answer.userAnswer === answer.correctAnswer) {
      correctAnswers = ++correctAnswers;
    }
  });

  const percentage = (correctAnswers / examQuestionsLength) * 100;

  return percentage;
};
