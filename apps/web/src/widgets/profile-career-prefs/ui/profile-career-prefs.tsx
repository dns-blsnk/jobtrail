'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/shared/analytics/use-analytics';
import { useMutateUserProfile } from '@/entities/user-profile/model/use-profile';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { EditCareerPrefsForm } from '@/features/profile/edit-career-prefs/ui/edit-career-prefs-form';
import type { CareerPrefsFormValues } from '@/features/profile/edit-career-prefs/model/career-prefs-schema';
import s from './profile-career-prefs.module.scss';

interface ProfileCareerPrefsProps {
  profile: UserProfile;
}

export function ProfileCareerPrefs({ profile }: ProfileCareerPrefsProps) {
  const t = useTranslations('profilePage');
  const [editing, setEditing] = useState(false);
  const mutation = useMutateUserProfile();
  const { capture } = useAnalytics();

  function handleSave(data: CareerPrefsFormValues) {
    const changedFields = (Object.keys(data) as (keyof CareerPrefsFormValues)[]).filter((k) => {
      const newVal = data[k];
      const oldVal = profile[k as keyof UserProfile];
      if (Array.isArray(newVal) && Array.isArray(oldVal)) {
        return JSON.stringify(newVal) !== JSON.stringify(oldVal);
      }
      return newVal !== oldVal;
    });

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
          {t('careerPrefs.title')}
        </Typography>
        {!editing && (
          <Button size="small" variant="text" onClick={() => setEditing(true)}>
            {t('actions.edit')}
          </Button>
        )}
      </Box>

      {editing ? (
        <EditCareerPrefsForm
          profile={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          isPending={mutation.isPending}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {profile.experienceLevel && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('careerPrefs.experienceLevel')}
              </Typography>
              <Chip label={profile.experienceLevel} size="small" />
            </Box>
          )}

          {profile.targetRoles.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('careerPrefs.targetRoles')}
              </Typography>
              {profile.targetRoles.map((r) => <Chip key={r} label={r} size="small" />)}
            </Box>
          )}

          {profile.preferredStack.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('careerPrefs.preferredStack')}
              </Typography>
              {profile.preferredStack.map((s) => <Chip key={s} label={s} size="small" variant="outlined" />)}
            </Box>
          )}

          {(profile.salaryMin !== null || profile.salaryMax !== null) && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('careerPrefs.salary')}
              </Typography>
              <Typography variant="body2">
                {profile.salaryMin ?? '?'} – {profile.salaryMax ?? '?'} {profile.salaryCurrency ?? 'USD'}
              </Typography>
            </Box>
          )}

          {profile.workFormat && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                {t('careerPrefs.workFormat')}
              </Typography>
              <Chip label={profile.workFormat} size="small" color="primary" variant="outlined" />
            </Box>
          )}

          {!profile.experienceLevel &&
            !profile.targetRoles.length &&
            !profile.preferredStack.length &&
            profile.salaryMin === null &&
            !profile.workFormat && (
              <Typography variant="body2" color="text.disabled">—</Typography>
            )}
        </Box>
      )}
    </section>
  );
}
