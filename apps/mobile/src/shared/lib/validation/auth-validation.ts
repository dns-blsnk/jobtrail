export interface AuthFormValues {
  email: string;
  password: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPassword = (value: string) => {
  const v = value.trim();
  return v.length >= 8 && /\d/.test(v) && /[A-Z]/.test(v);
};

export const validateAuthForm = (values: AuthFormValues): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(values.password)) {
    errors.password = 'Min 8 chars, 1 uppercase letter and 1 digit';
  }

  return errors;
};
