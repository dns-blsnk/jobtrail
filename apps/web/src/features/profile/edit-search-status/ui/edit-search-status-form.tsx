'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import s from './edit-search-status-form.module.scss';
import type { SearchStatus, UserProfile } from '@/entities/user-profile/model/types';

interface EditSearchStatusFormProps {
  profile: UserProfile;
  onStatusChange: (status: SearchStatus) => void;
  onAvailableFromChange: (date: string | null) => void;
  isPending: boolean;
}

const STATUSES: { value: SearchStatus; emoji: string; labelKey: 'activelyLooking' | 'openTo' | 'notLooking' }[] = [
  { value: 'ACTIVELY_LOOKING', emoji: '🟢', labelKey: 'activelyLooking' },
  { value: 'OPEN_TO_OPPORTUNITIES', emoji: '🟡', labelKey: 'openTo' },
  { value: 'NOT_LOOKING', emoji: '⚫', labelKey: 'notLooking' },
];

export function EditSearchStatusForm({
  profile,
  onStatusChange,
  onAvailableFromChange,
  isPending,
}: EditSearchStatusFormProps) {
  const t = useTranslations('profilePage');

  const availableFromDate = profile.availableFrom
    ? new Date(profile.availableFrom).toISOString().split('T')[0]
    : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        role="radiogroup"
        aria-label={t('searchStatus.title')}
        className={s.statusGrid}
      >
        {STATUSES.map(({ value, emoji, labelKey }) => {
          const isActive = profile.searchStatus === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={isPending}
              className={`${s.statusCard} ${isActive ? s.statusCardActive : ''}`}
              onClick={() => onStatusChange(value)}
            >
              <span aria-hidden>{emoji}</span>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t(`searchStatus.${labelKey}`)}
              </Typography>
            </button>
          );
        })}
      </Box>

      <TextField
        size="small"
        type="date"
        label={t('searchStatus.availableFrom')}
        value={availableFromDate}
        onChange={(e) => onAvailableFromChange(e.target.value || null)}
        disabled={isPending}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={{ maxWidth: 200 }}
      />
    </Box>
  );
}
