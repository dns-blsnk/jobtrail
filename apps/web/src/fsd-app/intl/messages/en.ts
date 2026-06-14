export const en = {
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
    descMobile: 'Drop in job links — we parse them and gather the key details in one place.',
    descDesktop:
      'Drop in job links — Jobtrail parses the description, extracts the key requirements, and keeps everything in one tracker.',
    copyright: '© 2026 Jobtrail · Built by Denys',
    columns: [
      {
        title: 'Product',
        links: ['Features', 'Pricing', 'Job parsing', 'Analytics', 'Roadmap'],
      },
      {
        title: 'Resources',
        links: ['Blog', 'Job-search guides', 'Resume templates', 'Help'],
      },
      {
        title: 'Company',
        links: ['About', 'Contact', 'Privacy', 'Terms'],
      },
    ],
    social: {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      blog: 'Blog',
    },
  },
  auth: {
    page: {
      logoMark: 'JT',
      logoName: 'Job Tracker',
    },
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
} as const;

export type Messages = typeof en;
