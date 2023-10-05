declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

export type userType = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  region: string;
  isVerified: boolean;
  isActive: boolean;
  grade: string;
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
  forgotPassword: string;
};

export type CreatePasswordataType = {
  userId: string;
  password: string;
  forgotPassword: string;
};
export type ResendCodeDataType = {
  userId: string;
};
