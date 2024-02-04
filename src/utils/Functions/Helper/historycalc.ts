import {Exam, ExamAnswers, Study, Subject} from '../../../Realm';
import {answersType} from '../../../screens/App/PracticeQuestion';
import {calculateStudyProgress} from '../../../screens/App/Study/logic';

type getHighScoreReturnType = {
  exam: Exam;
  userAnswer: answersType[];
  score: number;
} | null;

type getAllStudyProgressType =
  | []
  | {
      value: number;
      label: string;
    }[];

export const getHighScoreExam = (realm: Realm): getHighScoreReturnType => {
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

export const getAllStudiesProgress = (
  realm: Realm,
): getAllStudyProgressType => {
  let studyProgress: {
    value: number;
    label: string;
  }[] = [];
  const savedSubjects = realm.objects(Subject);

  for (const subject of savedSubjects) {
    const savedStudies = realm
      .objects(Study)
      .filtered(
        `subject.id = "${subject ? subject.id : 0}" OR subject.subject = "${
          subject.subject?.subject
        }"`,
      );

    const progress = calculateStudyProgress([...savedStudies]);
    console.log(subject.subject.subject);
    const subjectName = subject.subject
      ? subject.subject.subject.slice(0, 3)
      : null;

    if (subjectName) {
      studyProgress.push({
        label: subjectName,
        value: progress,
      });
    }
  }

  return studyProgress;
};
