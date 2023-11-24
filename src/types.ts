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
};
