type ProfileMenuItems = {
  [key: string]: {
    name: string;
    color: string;
    navigate:String
  };
};
 type FAQtype={
  [key: string]: {
    ques: string;
    ans: string;
   
 }
}
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
    navigate:'sub'
  },
  'About Us': {
    name: 'About Us',
    color: '#B5C3E5',
    navigate:''
  },
  'Contact Us': {
    name: 'Contact Us',
    color: '#F5A52D',
    navigate:'contactUs'
  },
  FAQ: {
    name: 'FAQ',
    color: '#74FF51',
    navigate:'FAQ'
  },
  'User Guide': {
    name: 'User Guide',
    color: '#74FF51',
    navigate:'Guide'
  },
};

export const ProfileMenuItemsAuth: ProfileMenuItems = {
  Profile: {
    name: 'Profile',
    color: '#1E90FF',
    navigate:'Profile'
  },
  ...ProfileMenuItems,
  Logout: {
    name: 'Logout',
    color: '#B5C3E5',
    navigate:'Logout'
  },
};
export const FAQ =  [
     
  {
    id:1,
    "ques":"How do i change my profile information",
    "ans":" You can update your profile information by navigating to the `Profile` section in the menu. Then click on the `profile` button to make changes."
  },
  {
    id:2,
    "ques":"How do i change my profile information",
    "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
  },
  {    id:3,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:4,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:5,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:6,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:7,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:8,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:9,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    },
    {  id:10,
      "ques":"How do i change my profile information",
      "ans":" You can update your profile information by navigating to the Profile section in the menu. Then click on the profile button to make changes."
    }
]

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
