import { z } from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Min 8 chars, 1 uppercase letter and 1 digit')
    .regex(/\d/, 'Min 8 chars, 1 uppercase letter and 1 digit')
    .regex(/[A-Z]/, 'Min 8 chars, 1 uppercase letter and 1 digit'),
});

export type AuthFormValues = z.infer<typeof authSchema>;
export type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;

export function validateAuthForm(values: AuthFormValues): AuthFormErrors {
  const result = authSchema.safeParse(values);
  if (result.success) return {};
  return result.error.issues.reduce<AuthFormErrors>((acc, issue) => {
    const field = issue.path[0] as keyof AuthFormValues;
    if (!acc[field]) acc[field] = issue.message;
    return acc;
  }, {});
}
