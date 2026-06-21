import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required('Name is required').max(100, 'Name must be at most 100 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters'),
  subject: Yup.string()
    .required('Subject is required')
    .max(200, 'Subject must be at most 200 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
});
