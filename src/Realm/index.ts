import Realm from 'realm';
import {
  ChallangeDayType,
  examQuestionType,
  gradeType,
  pdfType,
  singleChallenge,
  singleSubjectType,
  subjectType,
  userType,
  videoType,
} from '../types';
import {answersType} from '../screens/App/PracticeQuestion';

class Grade extends Realm.Object {
  id: string = '';
  grade: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'Grade',
    properties: {
      id: 'string',
      grade: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}
class UserData extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  deviceId: string | null = null;
  token: string | null = null;
  grade: gradeType | null = null;
  initialDate: string = '';
  isSubscribed: boolean = false;
  user: userType | null = null; // Define the user property as a reference to the User object.
  selectedSubjects?: string[] | [];
  allowedTrialDays: number = 0;
  allowedTrialDays_AfterLogin: number = 0;
  guestUserToken: string | null = null;
  loggedOutUser: userType | null = null; //saved data for loggedout user without deleting data
  loggedOutUserToken: string | null = null;

  static schema: Realm.ObjectSchema = {
    name: 'UserData',
    properties: {
      _id: 'objectId',
      deviceId: 'string?',
      token: 'string?',
      grade: 'Grade?',
      initialDate: 'string?',
      isSubscribed: 'bool',
      user: 'User?', // Link the 'user' property to the 'User' object.
      selectedSubjects: 'string[]',
      allowedTrialDays: 'int',
      allowedTrialDays_AfterLogin: 'int',
      guestUserToken: 'string?',
      loggedOutUser: 'User?',
      loggedOutUserToken: 'string?',
    },
    primaryKey: '_id',
  };
}

class Region extends Realm.Object {
  id: string = '';
  region: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'Region',
    properties: {
      id: 'string',
      region: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}

class User extends Realm.Object {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  region: {
    id: string;
    region: string;
    createdAt: string;
    updatedAt: string;
  } | null = null;
  isVerified: boolean = false;
  isActive: boolean = false;
  grade: gradeType | null = null;
  gender: 'MALE' | 'FEMALE' = 'MALE';
  email: string | null = null;
  verificationCode: string | null = null;
  profilePicture: string | null = null;
  subscriptionStatus: string | null = '';
  createdAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      phoneNumber: 'string',
      region: 'Region?',
      isVerified: 'bool',
      isActive: 'bool',
      grade: 'Grade',
      gender: 'string',
      email: 'string?',
      verificationCode: 'string?',
      profilePicture: 'string?',
      subscriptionStatus: 'string?',
      createdAt: 'string',
    },
  };
}

//subject object embeded inside of the subject returned by the server/api
class SingleSubject extends Realm.Object {
  id: string = '';
  subject: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'SingleSubject',
    properties: {
      id: 'string',
      subject: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}
class Subject extends Realm.Object {
  id: string = '';
  description: string = '';
  icon: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
  grade: gradeType | null = null;
  subject: singleSubjectType | null = null;
  progress?: number;

  static schema: Realm.ObjectSchema = {
    name: 'Subject',
    properties: {
      id: 'string',
      description: 'string',
      icon: 'string?',
      createdAt: 'string',
      updatedAt: 'string',
      subject: 'SingleSubject?',
      progress: 'int',
    },
  };
}

class ExamQuestion extends Realm.Object {
  id: string = '';
  number: string = '';
  questionType: string = '';
  question: string = '';
  A: string = '';
  B: string = '';
  C: string = '';
  D: string = '';
  answer: string = '';
  description: string = '';
  metadata: string | null = null;
  createdAt: string = '';
  updatedAt: string = '';
  static schema = {
    name: 'ExamQuestion',
    properties: {
      id: 'string',
      number: 'string',
      questionType: 'string',
      question: 'string',
      A: 'string',
      B: 'string',
      C: 'string',
      D: 'string',
      answer: 'string',
      description: 'string',
      metadata: 'string?',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}

class UserExamAnswers extends Realm.Object {
  id: string = '';
  index: number = 0;
  userAnswer: string = '';
  correctAnswer: string = '';
  static schema = {
    name: 'UserExamAnswers',
    properties: {
      id: 'string',
      index: 'int',
      userAnswer: 'string',
      correctAnswer: 'string',
    },
  };
}

class ExamAnswers extends Realm.Object {
  examId: string = '';
  examDate: string = '';
  userExamAnswers: answersType[] = [];
  timeStamp: Date | null = null;

  static schema = {
    name: 'ExamAnswers',
    properties: {
      examId: 'string',
      examDate: 'string',
      userExamAnswers: 'UserExamAnswers[]',
      timeStamp: 'date?',
    },
  };
}

class Exam extends Realm.Object {
  id: string = '';
  examName: string = '';
  examType: 'EXAM' | 'CUSTOM' = 'EXAM';
  duration: number = 0;
  passingScore: string = '';
  noOfQuestions: number = 0;
  addedQuestions: number = 0;
  isPublished: boolean = true;
  createdAt: string = '';
  updatedAt: string = '';
  examQuestion: examQuestionType[] | null = null;
  grade: gradeType | null = null;
  subject: singleSubjectType | null = null;
  year: string = '';
  isExamTaken: boolean = false;
  lastTaken: Date | null = null;

  static schema = {
    name: 'Exam',
    properties: {
      id: 'string',
      examName: 'string',
      examType: 'string',
      duration: 'int',
      passingScore: 'string',
      noOfQuestions: 'int',
      addedQuestions: 'int',
      isPublished: 'bool',
      createdAt: 'string',
      updatedAt: 'string',
      examQuestion: 'ExamQuestion[]',
      grade: 'Grade?',
      subject: 'SingleSubject?',
      year: 'string',
      isExamTaken: 'bool',
      lastTaken: 'date?',
    },
  };
}

class Pdf extends Realm.Object {
  id: string = '';
  pdfDocument: string = '';
  isViewed: boolean = false;

  static schema = {
    name: 'Pdf',
    properties: {
      id: 'string',
      pdfDocument: 'string',
      isViewed: 'bool',
    },
  };
}

class VideoLink extends Realm.Object {
  id: string = '';
  videoLink: string = '';
  isViewed: boolean = false;

  static schema = {
    name: 'VideoLink',
    properties: {
      id: 'string',
      videoLink: 'string',
      isViewed: 'bool',
    },
  };
}

class Study extends Realm.Object {
  id: string = '';
  title: string = '';
  objective: string = '';
  isPublished: boolean = true;
  createdAt: string = '';
  updatedAt: string = '';
  grade: gradeType | null = null;
  subject: subjectType | null = null;
  year: string = '';
  unit: string = '';
  section: string | null = '';
  selectedQuestion: examQuestionType[] = [];
  progress: number = 0;
  pdf: pdfType[] = [];
  videoLink: videoType[] = [];
  userExamAnswers: answersType[] | [] = [];

  static schema = {
    name: 'Study',
    properties: {
      id: 'string',
      title: 'string',
      objective: 'string',
      isPublished: 'bool',
      createdAt: 'string',
      updatedAt: 'string',
      grade: 'Grade?',
      subject: 'SingleSubject?',
      year: 'string',
      unit: 'string',
      section: 'string',
      selectedQuestion: 'ExamQuestion[]',
      progress: 'double',
      pdf: 'Pdf[]',
      videoLink: 'VideoLink[]',
      userExamAnswers: 'UserExamAnswers[]',
    },
  };
}

class StudyTips extends Realm.Object {
  id: string = '';
  tipType: string = '';
  tip: string = '';
  subject: singleSubjectType | null = null;

  static schema = {
    name: 'StudyTips',
    properties: {
      id: 'string',
      tipType: 'string',
      tip: 'string',
      subject: 'SingleSubject?',
    },
  };
}

class SingleChallenge extends Realm.Object {
  id: string = '';
  subject: singleSubjectType | null = null;
  unit: string | null = '';
  section: string | null = '';

  static schema = {
    name: 'SingleChallenge',
    properties: {
      id: 'string',
      subject: 'SingleSubject?',
      unit: 'string?',
      section: 'string?',
    },
  };
}

class ChallangeDay extends Realm.Object {
  id: string = '';
  day: number = 0;
  rest: boolean = true;
  singleChallenge: singleChallenge[] | [] = [];
  scheduledDate: string | null = null;

  static schema = {
    name: 'ChallangeDay',
    properties: {
      id: 'string',
      day: 'int',
      rest: 'bool',
      singleChallenge: 'SingleChallenge[]',
      scheduledDate: 'string?',
    },
  };
}

class Challange extends Realm.Object {
  id: string = '';
  title: string = '';
  isPublished: boolean = true;
  createdAt: string = '';
  updatedAt: string = '';
  challengeDay: ChallangeDayType[] | [] = [];
  progress: number = 0;
  finishedItems: string[] | [] = [];

  static schema = {
    name: 'Challange',
    properties: {
      id: 'string',
      title: 'string',
      isPublished: 'bool',
      createdAt: 'string',
      updatedAt: 'string',
      challengeDay: 'ChallangeDay[]',
      progress: 'double',
      finishedItems: 'string[]',
    },
  };
}

export {
  UserData,
  User,
  Grade,
  Region,
  SingleSubject,
  Subject,
  ExamQuestion,
  ExamAnswers,
  Exam,
  UserExamAnswers,
  Study,
  Pdf,
  VideoLink,
  StudyTips,
  SingleChallenge,
  ChallangeDay,
  Challange,
};
