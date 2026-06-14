export const contactPage = {
  title: 'Contact',
  subtitle: "We'd love to hear from you",
  info: {
    heading: 'Get in touch',
    emailLabel: 'Email',
    email: 'bilousenko.denys@gmail.com',
    copyLabel: 'Copy email',
    copiedLabel: 'Copied!',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    telegramLabel: 'Telegram',
  },
  form: {
    heading: 'Send a message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What is this about?',
    messageLabel: 'Message',
    messagePlaceholder: 'Your message...',
    submitLabel: 'Send message',
    sendingLabel: 'Sending...',
    successMessage: "Message sent! I'll get back to you soon.",
    errorMessage: 'Failed to send. Please email directly.',
  },
  location: {
    heading: 'Location',
    city: 'Tallinn, Estonia',
    localTimeLabel: 'Local time',
    status: 'Based in Tallinn · Typical response time: under 2 hours',
    mapsTitle: 'Tallinn, Estonia on Google Maps',
  },
} as const;

export type ContactPageMessages = typeof contactPage;
