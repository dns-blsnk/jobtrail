'use client';

import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/shared/analytics/use-analytics';
import { useMutateUserProfile } from '@/entities/user-profile/model/use-profile';
import type { SearchStatus, UserProfile } from '@/entities/user-profile/model/types';
import { EditSearchStatusForm } from '@/features/profile/edit-search-status/ui/edit-search-status-form';
import s from './profile-search-status.module.scss';

interface ProfileSearchStatusProps {
  profile: UserProfile;
}

export function ProfileSearchStatus({ profile }: ProfileSearchStatusProps) {
  const t = useTranslations('profilePage');
  const mutation = useMutateUserProfile();
  const { capture } = useAnalytics();

  function handleStatusChange(status: SearchStatus) {
    const prev = profile.searchStatus;
    mutation.mutate({ searchStatus: status }, {
      onSuccess: () => {
        if (prev !== status) capture('search_status_changed', { status });
      },
    });
  }

  function handleAvailableFromChange(date: string | null) {
    mutation.mutate({ availableFrom: date ?? undefined });
  }

  return (
    <section className={s.root}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        {t('searchStatus.title')}
      </Typography>

      <EditSearchStatusForm
        profile={profile}
        onStatusChange={handleStatusChange}
        onAvailableFromChange={handleAvailableFromChange}
        isPending={mutation.isPending}
      />

      {profile.availableFrom && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
          {t('searchStatus.availableFrom')}: {new Date(profile.availableFrom).toLocaleDateString()}
        </Typography>
      )}
    </section>
  );
}
