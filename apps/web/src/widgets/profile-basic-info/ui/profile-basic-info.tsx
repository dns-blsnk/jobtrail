'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/shared/analytics/use-analytics';
import { useMutateUserProfile } from '@/entities/user-profile/model/use-profile';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { EditBasicInfoForm } from '@/features/profile/edit-basic-info/ui/edit-basic-info-form';
import type { BasicInfoFormValues } from '@/features/profile/edit-basic-info/model/basic-info-schema';
import s from './profile-basic-info.module.scss';

interface ProfileBasicInfoProps {
  profile: UserProfile;
}

export function ProfileBasicInfo({ profile }: ProfileBasicInfoProps) {
  const t = useTranslations('profilePage');
  const [editing, setEditing] = useState(false);
  const mutation = useMutateUserProfile();
  const { capture } = useAnalytics();

  function handleSave(data: BasicInfoFormValues) {
    const changedFields = (Object.keys(data) as (keyof BasicInfoFormValues)[]).filter(
      (k) => data[k] !== (profile[k] ?? ''),
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

  return (
    <section className={s.root}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {t('basicInfo.title')}
        </Typography>
        {!editing && (
          <Button size="small" variant="text" onClick={() => setEditing(true)}>
            {t('actions.edit')}
          </Button>
        )}
      </Box>

      {editing ? (
        <EditBasicInfoForm
          profile={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          isPending={mutation.isPending}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {profile.headline ? (
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{profile.headline}</Typography>
          ) : (
            <Typography variant="body2" color="text.disabled">—</Typography>
          )}
          {profile.bio && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {profile.bio}
            </Typography>
          )}
          {profile.location && (
            <Typography variant="caption" color="text.secondary">
              📍 {profile.location}
            </Typography>
          )}
        </Box>
      )}
    </section>
  );
}
