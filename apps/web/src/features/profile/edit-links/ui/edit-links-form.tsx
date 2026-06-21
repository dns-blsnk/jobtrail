'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { FormTextField } from '@/shared/ui/form-text-field/form-text-field';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { linksSchema } from '../model/links-schema';
import type { LinksFormValues } from '../model/links-schema';

interface EditLinksFormProps {
  profile: UserProfile;
  onSave: (data: LinksFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
}

function validate(values: LinksFormValues) {
  const result = linksSchema.safeParse(values);
  if (result.success) return {};
  return result.error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = String(issue.path[0]);
    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {});
}

export function EditLinksForm({ profile, onSave, onCancel, isPending }: EditLinksFormProps) {
  const t = useTranslations('profilePage');

  const formik = useFormik<LinksFormValues>({
    initialValues: {
      linkedinUrl: profile.linkedinUrl ?? '',
      githubUrl: profile.githubUrl ?? '',
      portfolioUrl: profile.portfolioUrl ?? '',
    },
    validate,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      onSave({
        linkedinUrl: values.linkedinUrl?.trim() || undefined,
        githubUrl: values.githubUrl?.trim() || undefined,
        portfolioUrl: values.portfolioUrl?.trim() || undefined,
      });
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <FormTextField
          size="small"
          label={t('links.linkedin')}
          name="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/..."
          value={formik.values.linkedinUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.linkedinUrl && Boolean(formik.errors.linkedinUrl)}
          helperText={formik.touched.linkedinUrl ? formik.errors.linkedinUrl : ' '}
          fullWidth
        />
        <FormTextField
          size="small"
          label={t('links.github')}
          name="githubUrl"
          type="url"
          placeholder="https://github.com/..."
          value={formik.values.githubUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.githubUrl && Boolean(formik.errors.githubUrl)}
          helperText={formik.touched.githubUrl ? formik.errors.githubUrl : ' '}
          fullWidth
        />
        <FormTextField
          size="small"
          label={t('links.portfolio')}
          name="portfolioUrl"
          type="url"
          placeholder="https://..."
          value={formik.values.portfolioUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.portfolioUrl && Boolean(formik.errors.portfolioUrl)}
          helperText={formik.touched.portfolioUrl ? formik.errors.portfolioUrl : ' '}
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
