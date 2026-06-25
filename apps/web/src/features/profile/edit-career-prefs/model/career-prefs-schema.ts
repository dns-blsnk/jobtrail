import { z } from 'zod';

const experienceLevels = ['INTERN', 'JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL'] as const;
const workFormats = ['REMOTE', 'HYBRID', 'ONSITE', 'ANY'] as const;

export const careerPrefsSchema = z
  .object({
    experienceLevel: z.enum(experienceLevels).optional(),
    targetRoles: z.array(z.string().max(100)).optional(),
    preferredStack: z.array(z.string().max(100)).optional(),
    salaryMin: z.number().int().min(0).max(10_000_000).optional(),
    salaryMax: z.number().int().min(0).max(10_000_000).optional(),
    salaryCurrency: z.string().max(10).optional(),
    workFormat: z.enum(workFormats).optional(),
  })
  .refine(
    (data) => {
      if (data.salaryMin !== undefined && data.salaryMax !== undefined) {
        return data.salaryMin <= data.salaryMax;
      }
      return true;
    },
    { message: 'Minimum salary cannot exceed maximum salary', path: ['salaryMin'] },
  );

export type CareerPrefsFormValues = z.infer<typeof careerPrefsSchema>;
