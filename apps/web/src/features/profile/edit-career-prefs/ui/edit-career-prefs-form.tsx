'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { TagInput } from '@/shared/ui/tag-input/tag-input';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { careerPrefsSchema } from '../model/career-prefs-schema';
import type { CareerPrefsFormValues } from '../model/career-prefs-schema';

interface EditCareerPrefsFormProps {
  profile: UserProfile;
  onSave: (data: CareerPrefsFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
}

const EXPERIENCE_LEVELS = ['INTERN', 'JUNIOR', 'MIDDLE', 'SENIOR', 'LEAD', 'PRINCIPAL'] as const;
const WORK_FORMATS = ['REMOTE', 'HYBRID', 'ONSITE', 'ANY'] as const;

function validate(values: CareerPrefsFormValues) {
  const sanitized = {
    ...values,
    salaryMin: values.salaryMin === undefined || String(values.salaryMin) === '' ? undefined : Number(values.salaryMin),
    salaryMax: values.salaryMax === undefined || String(values.salaryMax) === '' ? undefined : Number(values.salaryMax),
  };
  const result = careerPrefsSchema.safeParse(sanitized);
  if (result.success) return {};
  return result.error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = String(issue.path[0]);
    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}

export function EditCareerPrefsForm({
  profile,
  onSave,
  onCancel,
  isPending,
}: EditCareerPrefsFormProps) {
  const t = useTranslations('profilePage');

  const formik = useFormik<CareerPrefsFormValues>({
    initialValues: {
      experienceLevel: profile.experienceLevel ?? undefined,
      targetRoles: profile.targetRoles ?? [],
      preferredStack: profile.preferredStack ?? [],
      salaryMin: profile.salaryMin ?? undefined,
      salaryMax: profile.salaryMax ?? undefined,
      salaryCurrency: profile.salaryCurrency ?? 'USD',
      workFormat: profile.workFormat ?? undefined,
    },
    validate,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      onSave({
        ...values,
        salaryMin: values.salaryMin !== undefined && String(values.salaryMin) !== '' ? Number(values.salaryMin) : undefined,
        salaryMax: values.salaryMax !== undefined && String(values.salaryMax) !== '' ? Number(values.salaryMax) : undefined,
      });
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          select
          size="small"
          label={t('careerPrefs.experienceLevel')}
          name="experienceLevel"
          value={formik.values.experienceLevel ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.experienceLevel && Boolean(formik.errors.experienceLevel)}
          helperText={(formik.touched.experienceLevel && formik.errors.experienceLevel) || ' '}
          fullWidth
        >
          <MenuItem value="">—</MenuItem>
          {EXPERIENCE_LEVELS.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>{lvl.charAt(0) + lvl.slice(1).toLowerCase()}</MenuItem>
          ))}
        </TextField>

        <Box>
          <TagInput
            label={t('careerPrefs.targetRoles')}
            placeholder="e.g. Frontend Engineer — press Enter"
            value={formik.values.targetRoles ?? []}
            onChange={(tags) => void formik.setFieldValue('targetRoles', tags)}
            error={Boolean(formik.errors.targetRoles)}
            helperText={typeof formik.errors.targetRoles === 'string' ? formik.errors.targetRoles : ' '}
          />
        </Box>

        <Box>
          <TagInput
            label={t('careerPrefs.preferredStack')}
            placeholder="e.g. React — press Enter"
            value={formik.values.preferredStack ?? []}
            onChange={(tags) => void formik.setFieldValue('preferredStack', tags)}
            error={Boolean(formik.errors.preferredStack)}
            helperText={typeof formik.errors.preferredStack === 'string' ? formik.errors.preferredStack : ' '}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <TextField
            size="small"
            type="number"
            label={`${t('careerPrefs.salary')} min`}
            name="salaryMin"
            value={formik.values.salaryMin ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salaryMin && Boolean(formik.errors.salaryMin)}
            helperText={(formik.touched.salaryMin && formik.errors.salaryMin) || ' '}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            type="number"
            label={`${t('careerPrefs.salary')} max`}
            name="salaryMax"
            value={formik.values.salaryMax ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salaryMax && Boolean(formik.errors.salaryMax)}
            helperText={(formik.touched.salaryMax && formik.errors.salaryMax) || ' '}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Currency"
            name="salaryCurrency"
            value={formik.values.salaryCurrency ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ width: 90 }}
            helperText=" "
          />
        </Box>

        <TextField
          select
          size="small"
          label={t('careerPrefs.workFormat')}
          name="workFormat"
          value={formik.values.workFormat ?? ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          helperText=" "
        >
          <MenuItem value="">—</MenuItem>
          {WORK_FORMATS.map((fmt) => (
            <MenuItem key={fmt} value={fmt}>{fmt.charAt(0) + fmt.slice(1).toLowerCase()}</MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined" onClick={onCancel} disabled={isPending}>
            {t('actions.cancel')}
          </Button>
          <Button
            size="small"
            variant="contained"
            type="submit"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={14} color="inherit" /> : undefined}
          >
            {t('actions.save')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
