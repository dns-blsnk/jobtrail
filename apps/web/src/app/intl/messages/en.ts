import { aboutPage } from './en/about-page';
import { landingPage } from './en/landing-page';
import { resumeBuilderPage } from './en/resume-builder-page';
import { analyticsPage } from './en/analytics-page';
import { applicationsPage } from './en/applications-page';
import { authPage } from './en/auth-page';
import { blogPage } from './en/blog-page';
import { contactPage } from './en/contact-page';
import { dashboardPage } from './en/dashboard-page';
import { helpPage } from './en/help-page';
import { jobSearchGuidesPage } from './en/job-search-guides-page';
import { jobsPage } from './en/jobs-page';
import { privacyPage } from './en/privacy-page';
import { profilePage } from './en/profile-page';
import { resumeTemplatesPage } from './en/resume-templates-page';
import { termsPage } from './en/terms-page';

const en = {
  common: {
    appName: 'Jobtrail',
    appNameFull: 'Job Tracker',
    logoAriaLabel: 'Jobtrail home',
    logoMark: 'JT',
    logIn: 'Log in',
    signUp: 'Sign up',
    addJob: 'Add job',
  },
  header: {
    nav: {
      dashboard: 'Dashboard',
      jobs: 'Jobs',
      applications: 'Applications',
      analytics: 'Analytics',
      features: 'Features',
      pricing: 'Pricing',
      about: 'About',
    },
    aria: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      addJob: 'Add job',
      userMenu: 'User menu',
      search: 'Search',
      notifications: 'Notifications',
    },
    drawer: {
      navLabel: 'Navigation',
      userMenuLabel: 'User menu',
    },
  },
  footer: {
    copyright: '© 2026 Jobtrail · Built by Denys',
    nav: {
      blog: 'Blog',
      help: 'Help',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  auth: {
    form: {
      title: 'Get Started now',
      subtitle: 'Create an account or log in to explore about our app',
      modeLogin: 'Log In',
      modeRegister: 'Sign Up',
      emailLabel: 'Email',
      emailPlaceholder: 'yourname@gmail.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Password',
    },
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Enter a valid email',
      passwordRequired: 'Password is required',
      passwordWeak: 'Min 8 chars, 1 uppercase letter and 1 digit',
    },
  },
  userMenu: {
    fallbackName: 'User',
    profile: 'Profile',
    myApplications: 'My applications',
    subscription: 'Subscription',
    subscriptionFree: 'Free',
    settings: 'Settings',
    logOut: 'Log out',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  profileCard: {
    logOut: 'Log Out',
  },
  authPage,
  aboutPage,
  landingPage,
  analyticsPage,
  applicationsPage,
  blogPage,
  contactPage,
  dashboardPage,
  helpPage,
  jobSearchGuidesPage,
  jobsPage,
  privacyPage,
  profilePage,
  resumeBuilderPage,
  resumeTemplatesPage,
  termsPage,
} as const;

export default en;
export type Messages = typeof en;
