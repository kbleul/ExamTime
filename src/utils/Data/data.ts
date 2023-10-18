type ProfileMenuItems = {
  [key: string]: {
    name: string;
    color: string;
    navigate:string
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
    navigate: 'SubscriptionPlan',
  },
  'About Us': {
    name: 'About Us',
    color: '#B5C3E5',
    navigate: 'Aboutus',
  },
  'Contact Us': {
    name: 'Contact Us',
    color: '#F5A52D',
    navigate: 'Profile-Edit',
  },
  'FAQ': {
    name: 'FAQ',
    color: '#74FF51',
    navigate: 'Profile-Edit',
  },
  'User Guide': {
    name: 'User Guide',
    color: '#74FF51',
    navigate: 'Profile-Edit',
  },
};

export const ProfileMenuItemsAuth: ProfileMenuItems = {
  'Profile': {
    name: 'Profile',
    color: '#1E90FF',
    navigate: 'Profile-Edit',
  },
  
  ...ProfileMenuItems,
  'Logout': {
    name: 'Logout',
    color: '#B5C3E5',
    navigate: 'Profile-Edit',
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
