'use client';

import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/icon/icon';
import { contactSchema } from '@/features/contact/model/contact-schema';
import { useContactForm } from '@/features/contact/model/use-contact-form';
import { ContactApiError } from '@/features/contact/api/contact-api';
import type { ContactPayload } from '@/features/contact/api/contact-api';
import { clsx } from 'clsx';
import s from './contact-form.module.scss';

const INITIAL_VALUES: ContactPayload = { name: '', email: '', subject: '', message: '' };

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
      <h2 className={s.heading}>{t('heading')}</h2>

      <form className={s.form} noValidate onSubmit={formik.handleSubmit}>
        <div className={s.row}>
          <div className={s.field}>
            <label className={s.label} htmlFor="contact-name">
              {t('nameLabel')}
            </label>
            <input
              aria-describedby="contact-name-error"
              aria-invalid={!!fieldError('name')}
              className={clsx(s.input, fieldError('name') && s.inputError)}
              id="contact-name"
              name="name"
              placeholder={t('namePlaceholder')}
              type="text"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <span className={s.fieldError} id="contact-name-error" role="alert">
              {fieldError('name')}
            </span>
          </div>

          <div className={s.field}>
            <label className={s.label} htmlFor="contact-email">
              {t('emailLabel')}
            </label>
            <input
              aria-describedby="contact-email-error"
              aria-invalid={!!fieldError('email')}
              className={clsx(s.input, fieldError('email') && s.inputError)}
              id="contact-email"
              name="email"
              placeholder={t('emailPlaceholder')}
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <span className={s.fieldError} id="contact-email-error" role="alert">
              {fieldError('email')}
            </span>
          </div>
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor="contact-subject">
            {t('subjectLabel')}
          </label>
          <input
            aria-describedby="contact-subject-error"
            aria-invalid={!!fieldError('subject')}
            className={clsx(s.input, fieldError('subject') && s.inputError)}
            id="contact-subject"
            name="subject"
            placeholder={t('subjectPlaceholder')}
            type="text"
            value={formik.values.subject}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className={s.fieldError} id="contact-subject-error" role="alert">
            {fieldError('subject')}
          </span>
        </div>

        <div className={s.field}>
          <label className={s.label} htmlFor="contact-message">
            {t('messageLabel')}
          </label>
          <textarea
            aria-describedby="contact-message-error"
            aria-invalid={!!fieldError('message')}
            className={clsx(s.input, s.textarea, fieldError('message') && s.inputError)}
            id="contact-message"
            name="message"
            placeholder={t('messagePlaceholder')}
            rows={5}
            value={formik.values.message}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className={s.fieldError} id="contact-message-error" role="alert">
            {fieldError('message')}
          </span>
        </div>

        <div className={s.submitArea}>
          {mutation.isSuccess ? (
            <div className={s.successBanner} role="status">
              <Icon name="check" size={14} strokeWidth={2.5} />
              <span>{t('successMessage')}</span>
              <button
                className={s.resetBtn}
                type="button"
                onClick={() => mutation.reset()}
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              {mutation.isError && !(mutation.error instanceof ContactApiError && mutation.error.fields) && (
                <p className={s.errorText} role="alert">
                  {mutation.error.message}
                </p>
              )}
              <button
                className={s.submitBtn}
                disabled={mutation.isPending}
                type="submit"
              >
                {mutation.isPending ? (
                  <>
                    <span className={s.spinner} />
                    {t('sendingLabel')}
                  </>
                ) : (
                  <>
                    <Icon name="send" size={16} strokeWidth={2} />
                    {t('submitLabel')}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
}
