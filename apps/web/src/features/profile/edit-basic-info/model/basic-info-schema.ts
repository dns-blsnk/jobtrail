import { z } from 'zod';

export const basicInfoSchema = z.object({
  headline: z.string().max(200, 'Max 200 characters').optional(),
  bio: z.string().max(2000, 'Max 2000 characters').optional(),
  location: z.string().max(200, 'Max 200 characters').optional(),
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
