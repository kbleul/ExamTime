import {Dimensions} from 'react-native';

type ProfileMenuItems = {
  [key: string]: {
    name: string;
    color: string;
<<<<<<< HEAD
    navigate: String;
=======
    navigate: string;
>>>>>>> ETID-15
  };
};

type TopCatagoriesType = string[];

export const DummyDataScience = [
  {subjName: 'Mathematics'},
  {subjName: 'English'},
  {subjName: 'Biology'},
  {subjName: 'Physics'},
  {subjName: 'SAT'},
  {subjName: 'Chemistry'},
];

export const DummyDataSocial = [
  {subjName: 'History'},
  {subjName: 'English'},
  {subjName: 'Geography'},
  {subjName: 'Civics'},
  {subjName: 'Math'},
  {subjName: 'Economics'},
];

export const CourseCatagories: TopCatagoriesType = ['Study', 'Challenge'];
export const TestQustionsCatagories: TopCatagoriesType = [
  'Model Questions',
  'Previous Exams',
  'Random',
];

export const ProfileMenuItems: ProfileMenuItems = {
  'Subscription Plan': {
    name: 'Subscription Plan',
    color: '#008E97',
<<<<<<< HEAD
    navigate: 'Subscription Plan',
=======
    navigate: 'SubscriptionPlan',
>>>>>>> ETID-15
  },
  'About Us': {
    name: 'About Us',
    color: '#B5C3E5',
<<<<<<< HEAD
    navigate: 'About Us',
=======
    navigate: 'Aboutus',
>>>>>>> ETID-15
  },
  'Contact Us': {
    name: 'Contact Us',
    color: '#F5A52D',
<<<<<<< HEAD
    navigate: 'Contact Us',
=======
    navigate: 'Profile-Edit',
>>>>>>> ETID-15
  },
  FAQ: {
    name: 'FAQ',
    color: '#74FF51',
    navigate: 'FAQ',
  },
  'User Guide': {
    name: 'User Guide',
    color: '#74FF51',
    navigate: 'User Guide',
  },
};

export const ProfileMenuItemsAuth: ProfileMenuItems = {
  Profile: {
    name: 'Profile',
    color: '#1E90FF',
<<<<<<< HEAD
    navigate: 'Profile',
=======
    navigate: 'Profile-Edit',
>>>>>>> ETID-15
  },

  ...ProfileMenuItems,
  Logout: {
    name: 'Logout',
    color: '#B5C3E5',
    navigate: 'Logout',
  },
};
export const FAQ = [
  {
    id: 1,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the `Profile` section in the menu. Then click on the `profile` button to make changes.',
  },
  {
    id: 2,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 3,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 4,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 5,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 6,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 7,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 8,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 9,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
  {
    id: 10,
    ques: 'How do i change my profile information',
    ans: ' You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes.',
  },
];

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
  },
  {
    id: '002',
  },
  {
    id: '003',
  },
  {
    id: '004',
  },
];

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
