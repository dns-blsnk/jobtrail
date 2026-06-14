export const contactPage = {
  title: 'Contact',
  subtitle: "We'd love to hear from you",
  emailLabel: 'Email us at',
  emailAddress: 'bilousenko.denys@gmail.com',
} as const;

export type ContactPageMessages = typeof contactPage;
