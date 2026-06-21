import { z } from 'zod';

const optionalUrl = z
  .string()
  .refine((v) => !v || z.string().url().safeParse(v).success, { message: 'Must be a valid URL' })
  .optional();

export const linksSchema = z.object({
  linkedinUrl: optionalUrl,
  githubUrl: optionalUrl,
  portfolioUrl: optionalUrl,
});

export type LinksFormValues = z.infer<typeof linksSchema>;
