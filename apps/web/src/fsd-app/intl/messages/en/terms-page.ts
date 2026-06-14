export const termsPage = {
  title: 'Terms of Service',
  lastUpdated: 'Last updated: 14 June 2026',
  introTitle: 'Acceptance of Terms',
  introBody:
    'By accessing or using Jobtrail ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We may update these terms from time to time; continued use of the Service after changes constitutes acceptance of the revised terms.',
  serviceTitle: 'Description of Service',
  serviceBody:
    'Jobtrail is a web application that helps users organise and track their job applications. The Service includes job posting parsing, application pipeline management, note-taking, and analytics features. We provide the Service on an "as is" and "as available" basis and reserve the right to modify, suspend, or discontinue any feature at any time.',
  accountTitle: 'Account Responsibilities',
  accountBody:
    'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately of any unauthorised use. You may not share your account with other persons or create multiple accounts for the purpose of circumventing limits.',
  conductTitle: 'Acceptable Use',
  conductBody:
    'You agree to use the Service only for lawful purposes. You may not use the Service to scrape or harvest data at scale, to attempt to gain unauthorised access to other accounts or systems, to transmit malicious code or interfere with the Service, or to violate the intellectual property rights of any third party.',
  prohibitedTitle: 'Prohibited Activities',
  prohibitedBody:
    'The following are strictly prohibited: reverse engineering or attempting to extract source code from the Service; reselling, sublicensing, or commercially exploiting the Service without prior written consent; using automated tools to create accounts or interact with the Service in a manner that places undue burden on our infrastructure.',
  ipTitle: 'Intellectual Property',
  ipBody:
    'All content, branding, and code that form the Jobtrail Service remain the exclusive intellectual property of Jobtrail and its licensors. You retain ownership of the content you create within the Service, such as notes and custom labels. You grant us a limited licence to store and process that content solely for the purpose of providing the Service to you.',
  liabilityTitle: 'Limitation of Liability',
  liabilityBody:
    'To the maximum extent permitted by applicable law, Jobtrail shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, including lost opportunities or data loss. Our total liability for any claim shall not exceed the amount you paid us in the twelve months preceding the claim.',
  terminationTitle: 'Termination',
  terminationBody:
    'You may terminate your account at any time from your profile settings. We may suspend or terminate your account without notice if we believe you have violated these terms. Upon termination, your right to use the Service ceases immediately and we will delete your data in accordance with our Privacy Policy.',
  contactTitle: 'Contact',
  contactBody:
    'Questions about these Terms of Service should be sent to legal@jobtrail.app. We will endeavour to respond to all enquiries within 10 business days.',
} as const;

export type TermsPageMessages = typeof termsPage;
