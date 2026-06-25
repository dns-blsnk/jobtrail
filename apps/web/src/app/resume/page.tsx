import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ResumeBuilderPage } from '@/views/resume-builder/ui/resume-builder-page';

export default async function ResumeRoute() {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={{ resumeBuilderPage: messages.resumeBuilderPage }}>
      <ResumeBuilderPage />
    </NextIntlClientProvider>
  );
}
