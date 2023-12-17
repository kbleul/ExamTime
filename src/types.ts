declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

export type userType = {
  location: any;
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  region: string;
  isVerified: boolean;
  isActive: boolean;
  grade: gradeType;
  gender: 'MALE' | 'FEMALE';
  email: string | null;
  verificationCode?: string;
  profilePicture: string | null;
};

export type seterProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setUnregisteredUser: React.Dispatch<React.SetStateAction<userType | null>>;
  unregisteredUser?: userType | null;
  isReset?: boolean;
};

export type SignupDataType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  gender: 'Male' | 'Female';
  region: string;
  grade: string;
};

export type LoginDataType = {
  phoneNumber: string;
  password: string;
};

export type OTPDataType = {
  userId: string;
  code: string;
  forgotPassword: boolean;
};
export type CommentType = {
  token: string;
  comment: string;
};

export type CreatePassworDataType = {
  userId: string;
  password: string;
  forForgotPassword: boolean;
};
export type ResendCodeDataType = {
  userId: string;
};

export type CreatePasswordFormDataType = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordFormDataType = {
  token: string;
  currentPassword: string;
  newPassword: string;
};

export type regionItemsType = {
  label: string;
  value: string;
};
export type faqItemsType = {
  question: string;
  answer: string;
};

export type examQuestionType = {
  id: string;
  number: string;
  questionType: string;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type examType = {
  id: string;
  examName: string;
  examType: string;
  duration: number;
  passingScore: string;
  noOfQuestions: number;
  addedQuestions: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  examQuestion: examQuestionType[];
  grade: gradeType;
  subject: singleSubjectType;
  year: year;
  isExamTaken: boolean;
  lastTaken: Date | null;
};

export type year =
  | {
      id: string;
      year: string;
      createdAt: string;
      updatedAt: string;
    }
  | string;

export type gradeType = {
  id: string;
  grade: string;
  createdAt: string;
  updatedAt: string;
};

export type singleSubjectType = {
  id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
};
export type subjectType = {
  id: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  grade: gradeType;
  subject: singleSubjectType;
  progress?: number;
};

export type downloadedSubjectType = {
  id: string;
  description: string;
  icon: Realm.Types.Data | null;
  createdAt: string;
  updatedAt: string;
  grade: gradeType;
  subject: singleSubjectType;
  progress?: number;
};

export type unitType = {
  id: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export type sectionType = {
  id: string;
  section: string;
  createdAt: string;
  updatedAt: string;
};

export type pdfType = {
  id: string;
  pdfDocument: string;
  isViewed: boolean;
};

export type videoType = {
  id: string;
  videoLink: string;
  isViewed: boolean;
};

export type studyType = {
  id: string;
  title: string;
  objective: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  grade: gradeType;
  subject: singleSubjectType;
  year: year;
  unit: unitType;
  section: sectionType;
  selectedQuestion: examQuestionType[] | [];
  pdf: pdfType[] | [];
  videoLink: videoType[] | [];
};

export type GuideDataType = {
  id: string;
  image: any;
  text: string;
  videoLink: string;
};

export type TipType = {
  id: string;
  tipType: string;
  tip: string;
  subject: singleSubjectType | null;
};

export type singleChallenge = {
  id: string;
  subject: singleSubjectType | null;
  unit: string | null;
  section: string | null;
};

export type ChallangeDayType = {
  id: string;
  day: number;
  rest: boolean;
  singleChallenge: singleChallenge[] | [];
  scheduledDate: string | null;
};

export type ChallangeType = {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  challengeDay: ChallangeDayType[] | [];
};
