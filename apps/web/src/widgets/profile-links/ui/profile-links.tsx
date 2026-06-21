'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/shared/analytics/use-analytics';
import { useMutateUserProfile } from '@/entities/user-profile/model/use-profile';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { EditLinksForm } from '@/features/profile/edit-links/ui/edit-links-form';
import type { LinksFormValues } from '@/features/profile/edit-links/model/links-schema';
import s from './profile-links.module.scss';

interface ProfileLinksProps {
  profile: UserProfile;
}

function LinkRow({ label, url }: { label: string; url: string | null }) {
  if (!url) return null;
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
        {label}
      </Typography>
      <Link href={url} target="_blank" rel="noopener noreferrer" variant="body2" noWrap>
        {url.replace(/^https?:\/\//, '')}
      </Link>
    </Box>
  );
}

export function ProfileLinks({ profile }: ProfileLinksProps) {
  const t = useTranslations('profilePage');
  const [editing, setEditing] = useState(false);
  const mutation = useMutateUserProfile();
  const { capture } = useAnalytics();

  function handleSave(data: LinksFormValues) {
    const changedFields = (Object.keys(data) as (keyof LinksFormValues)[]).filter(
      (k) => (data[k] || null) !== profile[k as keyof UserProfile],
    );
    mutation.mutate(data, {
      onSuccess: () => {
        setEditing(false);
        if (changedFields.length > 0) {
          capture('profile_updated', { fields_changed: changedFields });
        }
      },
    });
  }

  const hasLinks = profile.linkedinUrl || profile.githubUrl || profile.portfolioUrl;

  return (
    <section className={s.root}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {t('links.title')}
        </Typography>
        {!editing && (
          <Button size="small" variant="text" onClick={() => setEditing(true)}>
            {t('actions.edit')}
          </Button>
        )}
      </Box>

      {editing ? (
        <EditLinksForm
          profile={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          isPending={mutation.isPending}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <LinkRow label={t('links.linkedin')} url={profile.linkedinUrl} />
          <LinkRow label={t('links.github')} url={profile.githubUrl} />
          <LinkRow label={t('links.portfolio')} url={profile.portfolioUrl} />
          {!hasLinks && (
            <Typography variant="body2" color="text.disabled">—</Typography>
          )}
        </Box>
      )}
    </section>
  );
}
