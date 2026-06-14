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
  pages: {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Your job search at a glance',
      welcome: 'Welcome back',
      recentActivity: 'Recent Activity',
      emptyActivity: 'No recent activity. Add a job to get started.',
      stats: {
        totalApplications: 'Total Applications',
        interviews: 'Interviews',
        offers: 'Offers',
      },
    },
    jobs: {
      title: 'Jobs',
      subtitle: 'Browse and save job opportunities',
      empty: 'No jobs added yet',
      emptyHint: 'Paste a job posting URL above to parse and save it automatically.',
      addFirst: 'Add your first job',
    },
    applications: {
      title: 'Applications',
      subtitle: 'Track your application progress',
      empty: 'No applications yet',
      emptyHint: 'Applications you submit will appear here.',
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Insights into your job search',
      empty: 'Not enough data yet',
      emptyHint: 'Track more applications to unlock analytics.',
    },
    profile: {
      title: 'Profile',
      subtitle: 'Manage your account',
    },
    about: {
      title: 'About Jobtrail',
      subtitle: 'Built to simplify your job search',
      body: 'Jobtrail helps you stay organised during your job search. Paste a job link and we automatically parse the key details — title, company, requirements — so you can focus on applying, not copy-pasting.',
      missionTitle: 'Our mission',
      missionBody: 'To give every job seeker clarity and control over their search.',
    },
    contact: {
      title: 'Contact',
      subtitle: "We'd love to hear from you",
      emailLabel: 'Email us at',
      emailAddress: 'bilousenko.denys@gmail.com',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Last updated: January 2026',
      placeholder: 'Full privacy policy content coming soon.',
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Last updated: January 2026',
      placeholder: 'Full terms of service content coming soon.',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Tips and insights for job seekers',
      placeholder: 'Articles coming soon. Check back later.',
    },
    jobSearchGuides: {
      title: 'Job-search Guides',
      subtitle: 'Proven strategies for landing your next role',
      placeholder: 'Guides coming soon.',
    },
    resumeTemplates: {
      title: 'Resume Templates',
      subtitle: 'Professional templates to stand out',
      placeholder: 'Templates coming soon.',
    },
    help: {
      title: 'Help Center',
      subtitle: 'Everything you need to get started',
      placeholder: 'Help content coming soon.',
    },
  },
} as const;

export type Messages = typeof en;
