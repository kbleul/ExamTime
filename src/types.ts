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
  grade: {};
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

export type regionItemsType = {
  label: string;
  value: string;
};
