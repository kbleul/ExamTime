import {Dimensions} from 'react-native';
import img1 from '../../assets/Images/onboarding/3.png';
import img2 from '../../assets/Images/onboarding/4.png';
import img3 from '../../assets/Images/onboarding/1.png';
import img4 from '../../assets/Images/onboarding/2.png';
import img5 from '../../assets/Images/courses/car.png';

import cbe1 from '../../assets/Images/banks/cbe1.png';
import cbe2 from '../../assets/Images/banks/cbe2.png';
import chapa1 from '../../assets/Images/banks/chapa1.png';
import chapa2 from '../../assets/Images/banks/chapa2.png';

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

export const STATUSTYPES = {
  Trial: 'Trial',
  NotAuthorized: 'NotAuthorized',
  AuthorizedTrial: 'AuthorizedTrial',
  Unsubscribed: 'Unsubscribed',
  Subscribed: 'Subscribed',
};

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
  4: img1,
  5: img2,
  6: img3,
  7: img4,
  100: img5,
};

export const NumberConverter = new Map();

export const PaymentMethods = [
  {
    id: 'pay001',
    name: 'CBE',
    imgs: [cbe1, cbe2],
    youtubeLink: 'https://www.youtube.com/watch?v=nqggWaCACjk',
    notes: [
      'በኢትዮጽያንግድ ባንክ አካዉንት ስም “THINK HUB ET SOFTWARE DEV PLC” ወይም "ቲንክ ሀብ ኢት" በሂሳብ ቁጥር 1000551860527 ብር ማስተላለፍ',
      'ከባንኩ ከሚሰጥ ደረሰኝ ላይ የአስገቢው ሰዉ ስም ወይም የሂሳብ ቁጥር ባለቤት እና የደረሰኝ መለያ ቁጥር (Tras . Refe) መረጃዎች በጥንቃቄ ማስገባት',
      'ማሳሰቢያ፡ መረጃዉን ካስገቡበት በ24 ሰዓት ዉስጥ የSMS መልክት ይደርሶታል፡፡',
    ],
  },
  {
    id: 'pay-chapa-002',
    name: 'Chapa',
    imgs: [chapa1, chapa2],
    youtubeLink: 'https://www.youtube.com/watch?v=nqggWaCACjk',
    notes: [
      'ቻፓ የሚለውን ምረጡ',
      'ከሚመጡት አማራጮች ውስጥ የምትፈልጉትን የሞባይል የክፍያ መንገድ ምረጡ',
      'የcbe birr/ telebir ስልክ ቁጥራችሁን አስገቡ',
      'pay የሚለውን ከተጫናችሁ በኋላ የሚስጥር ቁጥራችሁን በማስገባት ክፍያውን ማጠናቀቅ ትችላላችሁ።',
    ],
  },
];

NumberConverter.set('One', 1);
NumberConverter.set('Two', 2);
NumberConverter.set('Three', 3);
NumberConverter.set('Four', 4);
NumberConverter.set('Five', 5);
NumberConverter.set('Six', 6);
NumberConverter.set('Seven', 7);
NumberConverter.set('Eight', 8);
NumberConverter.set('Nine', 9);
NumberConverter.set('Ten', 10);
NumberConverter.set('Eleven', 11);
NumberConverter.set('Twelve', 12);
NumberConverter.set('Thirteen', 13);
NumberConverter.set('Fourteen', 14);
NumberConverter.set('Fifteen', 15);
NumberConverter.set('Sixteen', 16);
NumberConverter.set('Seventeen', 17);
NumberConverter.set('Eighteen', 18);
NumberConverter.set('Nineteen', 19);
NumberConverter.set('Twenty', 20);
NumberConverter.set('Twenty One', 21);
NumberConverter.set('Twenty Two', 22);
NumberConverter.set('Twenty Three', 23);
NumberConverter.set('Twenty Four', 24);
NumberConverter.set('Twenty Five', 25);
NumberConverter.set('Twenty Six', 26);
NumberConverter.set('Twenty Seven', 27);
NumberConverter.set('Twenty Eight', 28);
NumberConverter.set('Twenty Nine', 29);
NumberConverter.set('Thirty', 30);
NumberConverter.set('Thirty One', 31);
NumberConverter.set('Thirty Two', 32);
NumberConverter.set('Thirty Three', 33);
NumberConverter.set('Thirty Four', 34);
NumberConverter.set('Thirty Five', 35);
NumberConverter.set('Thirty Six', 36);
NumberConverter.set('Thirty Seven', 37);
NumberConverter.set('Thirty Eight', 38);
NumberConverter.set('Thirty Nine', 39);
NumberConverter.set('Forty', 40);
NumberConverter.set('Forty One', 41);
NumberConverter.set('Forty Two', 42);
NumberConverter.set('Forty Three', 43);
NumberConverter.set('Forty Four', 44);
NumberConverter.set('Forty Five', 45);
NumberConverter.set('Forty Six', 46);
NumberConverter.set('Forty Seven', 47);
NumberConverter.set('Forty Eight', 48);
NumberConverter.set('Forty Nine', 49);
NumberConverter.set('Fifty', 50);
NumberConverter.set('Fifty One', 51);
NumberConverter.set('Fifty Two', 52);
NumberConverter.set('Fifty Three', 53);
NumberConverter.set('Fifty Four', 54);
NumberConverter.set('Fifty Five', 55);
NumberConverter.set('Fifty Six', 56);
NumberConverter.set('Fifty Seven', 57);
NumberConverter.set('Fifty Eight', 58);
NumberConverter.set('Fifty Nine', 59);
NumberConverter.set('Sixty', 60);
NumberConverter.set('Sixty One', 61);
NumberConverter.set('Sixty Two', 62);
NumberConverter.set('Sixty Three', 63);
NumberConverter.set('Sixty Four', 64);
NumberConverter.set('Sixty Five', 65);
NumberConverter.set('Sixty Six', 66);
NumberConverter.set('Sixty Seven', 67);
NumberConverter.set('Sixty Eight', 68);
NumberConverter.set('Sixty Nine', 69);
NumberConverter.set('Seventy', 70);
NumberConverter.set('Seventy One', 71);
NumberConverter.set('Seventy Two', 72);
NumberConverter.set('Seventy Three', 73);
NumberConverter.set('Seventy Four', 74);
NumberConverter.set('Seventy Five', 75);
NumberConverter.set('Seventy Six', 76);
NumberConverter.set('Seventy Seven', 77);
NumberConverter.set('Seventy Eight', 78);
NumberConverter.set('Seventy Nine', 79);
NumberConverter.set('Eighty', 80);
NumberConverter.set('Eighty One', 81);
NumberConverter.set('Eighty Two', 82);
NumberConverter.set('Eighty Three', 83);
NumberConverter.set('Eighty Four', 84);
NumberConverter.set('Eighty Five', 85);
NumberConverter.set('Eighty Six', 86);
NumberConverter.set('Eighty Seven', 87);
NumberConverter.set('Eighty Eight', 88);
NumberConverter.set('Eighty Eight', 88);
NumberConverter.set('Eighty Nine', 89);

NumberConverter.set('Ninety', 90);
NumberConverter.set('Ninety One', 91);
NumberConverter.set('Ninety Two', 92);
NumberConverter.set('Ninety Three', 93);
NumberConverter.set('Ninety Four', 94);
NumberConverter.set('Ninety Five', 95);
NumberConverter.set('Ninety Six', 96);
NumberConverter.set('Ninety Seven', 97);
NumberConverter.set('Ninety Eight', 98);
NumberConverter.set('Ninety Nine', 99);
NumberConverter.set('One Hundred', 100);
