'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { FormTextField } from '@/shared/ui/form-text-field/form-text-field';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { basicInfoSchema } from '../model/basic-info-schema';
import type { BasicInfoFormValues } from '../model/basic-info-schema';

interface EditBasicInfoFormProps {
  profile: UserProfile;
  onSave: (data: BasicInfoFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
}

function validate(values: BasicInfoFormValues) {
  const result = basicInfoSchema.safeParse(values);
  if (result.success) return {};
  return result.error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = String(issue.path[0]);
    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}

export function EditBasicInfoForm({
  profile,
  onSave,
  onCancel,
  isPending,
}: EditBasicInfoFormProps) {
  const t = useTranslations('profilePage');

  const formik = useFormik<BasicInfoFormValues>({
    initialValues: {
      headline: profile.headline ?? '',
      bio: profile.bio ?? '',
      location: profile.location ?? '',
    },
    validate,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      const trimmed: BasicInfoFormValues = {
        headline: values.headline?.trim() || undefined,
        bio: values.bio?.trim() || undefined,
        location: values.location?.trim() || undefined,
      };
      onSave(trimmed);
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <FormTextField
          size="small"
          label={t('basicInfo.headline')}
          name="headline"
          value={formik.values.headline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.headline && Boolean(formik.errors.headline)}
          helperText={formik.touched.headline ? formik.errors.headline : ' '}
          fullWidth
        />
        <FormTextField
          size="small"
          label={t('basicInfo.bio')}
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio ? formik.errors.bio : ' '}
          fullWidth
          multiline
          rows={3}
        />
        <FormTextField
          size="small"
          label={t('basicInfo.location')}
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location ? formik.errors.location : ' '}
          fullWidth
        />
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
