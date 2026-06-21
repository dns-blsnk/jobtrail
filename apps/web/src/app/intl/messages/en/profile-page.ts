export const profilePage = {
  title: 'Profile',
  subtitle: 'Manage your career profile',
  completion: {
    label: 'Profile completion',
    hint: 'Complete your profile to get better job matches',
  },
  basicInfo: {
    title: 'Basic Info',
    headline: 'Professional headline',
    bio: 'About me',
    location: 'Location',
  },
  searchStatus: {
    title: 'Job Search Status',
    activelyLooking: 'Actively looking',
    openTo: 'Open to opportunities',
    notLooking: 'Not looking',
    availableFrom: 'Available from',
  },
  careerPrefs: {
    title: 'Career Preferences',
    experienceLevel: 'Experience level',
    targetRoles: 'Target roles',
    preferredStack: 'Preferred tech stack',
    salary: 'Expected salary',
    workFormat: 'Work format',
  },
  links: {
    title: 'Links',
    linkedin: 'LinkedIn URL',
    github: 'GitHub URL',
    portfolio: 'Portfolio URL',
  },
  actions: {
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
  },
} as const;

export type ProfilePageMessages = typeof profilePage;
