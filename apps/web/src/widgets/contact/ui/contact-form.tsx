'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { FormTextField } from '@/shared/ui/form-text-field/form-text-field';
import Typography from '@mui/material/Typography';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useContactForm } from '@job-search-tracker/api-client/contact/hooks';
import { ContactApiError } from '@job-search-tracker/api-client/contact';
import type { ContactPayload } from '@job-search-tracker/api-client/contact';
import { contactSchema } from '@/features/contact/model/contact-schema';
import s from './contact-form.module.scss';

const INITIAL_VALUES: ContactPayload = { name: '', email: '', subject: '', message: '' };

const sxGrid = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
  gap: 2,
} as const;

const sxSubmitBtn = { py: 1.25, fontWeight: 600 } as const;

export function ContactForm() {
  const t = useTranslations('contactPage.form');
  const mutation = useContactForm();

  const formik = useFormik<ContactPayload>({
    initialValues: INITIAL_VALUES,
    validationSchema: contactSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, { resetForm, setFieldError }) => {
      mutation.mutate(values, {
        onSuccess: () => resetForm(),
        onError: (error) => {
          if (error instanceof ContactApiError && error.fields) {
            Object.entries(error.fields).forEach(([field, message]) => {
              setFieldError(field, message);
            });
          }
        },
      });
    },
  });

  const fieldError = (name: keyof ContactPayload) =>
    formik.touched[name] ? formik.errors[name] : undefined;

  return (
    <section className={s.root}>
      <Typography
        component="h2"
        variant="h6"
        sx={{ letterSpacing: '-0.3px', fontWeight: 700, m: 0 }}
      >
        {t('heading')}
      </Typography>

      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={1.5}>
          <Box sx={sxGrid}>
            <FormTextField
              id="contact-name"
              name="name"
              label={t('nameLabel')}
              placeholder={t('namePlaceholder')}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!fieldError('name')}
              helperText={fieldError('name')}
              fullWidth
              size="small"
            />
            <FormTextField
              id="contact-email"
              name="email"
              type="email"
              label={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!fieldError('email')}
              helperText={fieldError('email')}
              fullWidth
              size="small"
            />
          </Box>

          <FormTextField
            id="contact-subject"
            name="subject"
            label={t('subjectLabel')}
            placeholder={t('subjectPlaceholder')}
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!fieldError('subject')}
            helperText={fieldError('subject')}
            fullWidth
            size="small"
          />

          <FormTextField
            id="contact-message"
            name="message"
            label={t('messageLabel')}
            placeholder={t('messagePlaceholder')}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!fieldError('message')}
            helperText={fieldError('message')}
            fullWidth
            multiline
            rows={5}
          />

          {mutation.isSuccess ? (
            <Alert
              severity="success"
              action={
                <Button color="inherit" size="small" onClick={() => mutation.reset()}>
                  Send another
                </Button>
              }
            >
              {t('successMessage')}
            </Alert>
          ) : (
            <Stack spacing={1}>
              {mutation.isError &&
                !(mutation.error instanceof ContactApiError && mutation.error.fields) && (
                  <Alert severity="error">{mutation.error.message}</Alert>
                )}
              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isPending}
                fullWidth
                startIcon={
                  mutation.isPending ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <SendOutlinedIcon sx={{ fontSize: 16 }} />
                  )
                }
                sx={sxSubmitBtn}
              >
                {mutation.isPending ? t('sendingLabel') : t('submitLabel')}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </section>
  );
}
