import {createRealmContext} from '@realm/react';
import {
  UserData,
  User,
  Region,
  Grade,
  SingleSubject,
  Subject,
  ExamQuestion,
  Exam,
  UserExamAnswers,
} from './index';
export const AuthContext = createRealmContext({
  schema: [
    UserData,
    User,
    Grade,
    Region,
    SingleSubject,
    Subject,
    ExamQuestion,
    Exam,
    UserExamAnswers,
  ],
  deleteRealmIfMigrationNeeded: true,
});
