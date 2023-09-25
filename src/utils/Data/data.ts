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
  Profile: {
    name: 'Profile',
    color: '#1E90FF',
  },
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
