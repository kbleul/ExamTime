import {Dimensions} from 'react-native';
import img1 from '../../assets/Images/onboarding/1.png';
import img2 from '../../assets/Images/onboarding/2.png';
import img3 from '../../assets/Images/onboarding/3.png';
import img4 from '../../assets/Images/onboarding/4.png';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

type ProfileMenuItems = {
  [key: string]: {
    name: string;
    color: string;
    navigate: string;
  };
};

type TopCatagoriesType = string[];

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
    navigate: 'SubscriptionPlan',
  },
  'About Us': {
    name: 'About Us',
    color: '#f5c02f',
    navigate: 'Aboutus',
  },
  'Contact Us': {
    name: 'Contact Us',
    color: '#F5A52D',
    navigate: 'Contact Us',
  },
  FAQ: {
    name: 'FAQ',
    color: '#74FF51',
    navigate: 'FAQ',
  },
  'User Guide': {
    name: 'User Guide',
    color: '#c891db',
    navigate: 'User Guide',
  },
};

export const ProfileMenuItemsAuth: ProfileMenuItems = {
  Profile: {
    name: 'Profile',
    color: '#1E90FF',
    navigate: 'Profile-Edit',
  },

  ...ProfileMenuItems,
  Logout: {
    name: 'Logout',
    color: '#B5C3E5',
    navigate: 'Logout',
  },
  'Delete Account': {
    name: 'Delete Account',
    color: 'red',
    navigate: 'Delete Account',
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

//for realm db
export const LocalStorageDataKeys = {
  token: 'token',
  userData: 'userData',
  onBoarding: 'onBoarding',
  trialStartDate: 'trialStartDate',
  userGrade: 'userGrade',
};

//for async storage
export const LocalObjectDataKeys = {
  User: 'User',
  UserData: 'UserData',
  Region: 'Region',
  Subject: 'Subject',
  SingleSubject: 'SingleSubject',
  Grade: 'Grade',
  ExamQuestion: 'ExamQuestion',
  Exam: 'Exam',
  UserExamAnswers: 'UserExamAnswers',
  Study: 'Study',
  Pdf: 'Pdf',
  VideoLink: 'VideoLink',
  ExamAnswers: 'ExamAnswers',
  Tip: 'StudyTips',
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

export const gradesImages: {[key: number]: any} = {
  0: img1,
  1: img2,
  2: img3,
  3: img4,
};
