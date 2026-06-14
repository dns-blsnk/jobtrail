import { z } from 'zod';

export interface AuthValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordWeak: string;
}

export type AuthFormErrors = Partial<Record<'email' | 'password', string>>;

export function createAuthSchema(msgs: AuthValidationMessages) {
  return z.object({
    email: z
      .string()
      .min(1, msgs.emailRequired)
      .email(msgs.emailInvalid),
    password: z
      .string()
      .min(1, msgs.passwordRequired)
      .min(8, msgs.passwordWeak)
      .regex(/\d/, msgs.passwordWeak)
      .regex(/[A-Z]/, msgs.passwordWeak),
  });
}

export type AuthFormValues = z.infer<ReturnType<typeof createAuthSchema>>;

export function validateAuthForm(values: AuthFormValues, msgs: AuthValidationMessages): AuthFormErrors {
  const result = createAuthSchema(msgs).safeParse(values);
  if (result.success) return {};
  return result.error.issues.reduce<AuthFormErrors>((acc, issue) => {
    const field = issue.path[0] as keyof AuthFormValues;
    if (!acc[field]) acc[field] = issue.message;
    return acc;
  }, {});
}
