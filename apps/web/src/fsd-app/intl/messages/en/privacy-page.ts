export const privacyPage = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: 14 June 2026',
  introTitle: 'Introduction',
  introBody:
    'Jobtrail ("we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains what information we collect, why we collect it, how we use it, and the rights you have under the General Data Protection Regulation (GDPR) and applicable privacy laws.',
  collectTitle: 'Information We Collect',
  collectBody:
    'We collect information you provide directly when you create an account, such as your name and email address. We also collect information about how you use the service: the job postings you save, the notes you add, and your interaction with features. Additionally, we collect standard technical data including IP address, browser type, and device identifiers for security and performance purposes.',
  useTitle: 'How We Use Your Data',
  useBody:
    'We use your data to provide and improve the Jobtrail service, to send transactional emails (such as account confirmation and password reset), and to analyse aggregate usage patterns so we can build better features. We do not sell your personal data to third parties. We do not use your data to serve you third-party advertising.',
  cookiesTitle: 'Cookies and Tracking',
  cookiesBody:
    'We use strictly necessary cookies to keep you logged in and maintain your session. We use analytics cookies (with your consent) to understand how people navigate the application. You can withdraw your consent to non-essential cookies at any time through your browser settings or our cookie preference centre.',
  retentionTitle: 'Data Retention',
  retentionBody:
    'We retain your personal data for as long as your account is active. If you delete your account, we will erase your personal data within 30 days, except where we are required by law to retain it for a longer period (for example, for financial record-keeping).',
  rightsTitle: 'Your Rights Under GDPR',
  rightsBody:
    'As a data subject under the GDPR, you have the right to access, rectify, or erase your personal data. You have the right to restrict or object to processing, and the right to data portability. You also have the right to withdraw consent at any time where processing is based on consent, and to lodge a complaint with your national data protection authority.',
  securityTitle: 'Security',
  securityBody:
    'We implement industry-standard security measures including encryption in transit (TLS), encrypted storage of sensitive fields, and regular security audits. However, no system is completely secure and we cannot guarantee absolute security of your information.',
  contactTitle: 'Contact Us',
  contactBody:
    'If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at privacy@jobtrail.app. We will respond to all legitimate requests within 30 days.',
} as const;

export type PrivacyPageMessages = typeof privacyPage;
