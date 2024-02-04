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

type getTopAndBottomStudyProgressType = null | {
  top: {
    label: string;
    value: number;
  };
  bottom: {
    label: string;
    value: number;
  };
};

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
  console.log(studyProgress);
  return studyProgress;
};

export const getTopAndBottomStudyProgress = (
  realm: Realm,
): getTopAndBottomStudyProgressType => {
  const studiesProgress = getAllStudiesProgress(realm);

  let top_bottom_study_progress: null | {
    top: {
      label: string;
      value: number;
    };
    bottom: {
      label: string;
      value: number;
    };
  } = null;

  for (const studyProgress of studiesProgress) {
    if (top_bottom_study_progress === null) {
      top_bottom_study_progress = {
        top: {
          ...studyProgress,
        },
        bottom: {
          ...studiesProgress[studiesProgress.length - 1],
        },
      };
      continue;
    }

    if (
      top_bottom_study_progress &&
      studyProgress.value > top_bottom_study_progress.top.value
    ) {
      top_bottom_study_progress = {
        top: {...studyProgress},
        bottom: {...top_bottom_study_progress.bottom},
      };
      continue;
    }

    if (
      top_bottom_study_progress !== null &&
      studyProgress.value < top_bottom_study_progress.bottom.value
    ) {
      top_bottom_study_progress = {
        top: {...top_bottom_study_progress.top},
        bottom: {...studyProgress},
      };
    }
  }

  return top_bottom_study_progress;
};

export const getAggrgategaStudiesProgress = (realm: Realm) => {
  const studyProgress = getAllStudiesProgress(realm);

  const totalProgress = studyProgress.reduce((acc, study) => {
    return acc + study.value;
  }, 0);

  return totalProgress / studyProgress.length;
};
