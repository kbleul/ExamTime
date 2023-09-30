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
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  user?: userType | null;
};
