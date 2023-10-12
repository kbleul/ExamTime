import {Dimensions} from 'react-native';

type ProfileMenuItems = {
  [key: string]: {
    name: string;
    color: string;
  };
};

type CourseCatagoriesType = string[];

export const DummyDataScience = [
  {subjName: 'Math'},
  {subjName: 'English'},
  {subjName: 'Biology'},
  {subjName: 'Physics'},
  {subjName: 'Chemistry'},
  {subjName: 'Civics'},
];

export const DummyDataSocial = [
  {subjName: 'History'},
  {subjName: 'English'},
  {subjName: 'Geography'},
  {subjName: 'Civics'},
  {subjName: 'Math'},
  {subjName: 'Economics'},
];

export const CourseCatagories: CourseCatagoriesType = ['Study', 'Challenge'];

export const ProfileMenuItems: ProfileMenuItems = {
  'Subscription Plan': {
    name: 'Subscription Plan',
    color: '#008E97',
  },
  'About Us': {
    name: 'About Us',
    color: '#B5C3E5',
  },
  'Contact Us': {
    name: 'Contact Us',
    color: '#F5A52D',
  },
  FAQ: {
    name: 'FAQ',
    color: '#74FF51',
  },
  'User Guide': {
    name: 'User Guide',
    color: '#74FF51',
  },
};

export const ProfileMenuItemsAuth: ProfileMenuItems = {
  Profile: {
    name: 'Profile',
    color: '#1E90FF',
  },
  ...ProfileMenuItems,
  Logout: {
    name: 'Logout',
    color: '#B5C3E5',
  },
};
export const allowedTrialDays = 3;

export const trialStatus = {
  expired: 'expired',
  started: 'started',
  trial: 'trial',
};

export const LocalStorageDataKeys = {
  token: 'token',
  userData: 'userData',
  onBoarding: 'onBoarding',
  trialStartDate: 'trialStartDate',
  userGrade: 'userGrade',
};

export const LocalObjectDataKeys = {
  User: 'User',
  UserData: 'UserData',
};

export const CarouselData_guest = [
  {
    id: '001',
    image: require('../../assets/Images/onboarding/1.png'),
  },
  {
    id: '002',
    image: require('../../assets/Images/onboarding/2.png'),
  },
  {
    id: '003',
    image: require('../../assets/Images/onboarding/3.png'),
  },
  {
    id: '004',
    image: require('../../assets/Images/onboarding/2.png'),
  },
];

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
