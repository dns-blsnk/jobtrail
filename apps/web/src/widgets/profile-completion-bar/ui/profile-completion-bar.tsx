'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import type { UserProfile } from '@/entities/user-profile/model/types';
import s from './profile-completion-bar.module.scss';

interface ProfileCompletionBarProps {
  profile: UserProfile;
}

const PROFILE_FIELDS: (keyof UserProfile)[] = [
  'headline',
  'bio',
  'location',
  'experienceLevel',
  'targetRoles',
  'preferredStack',
  'salaryMin',
  'searchStatus',
  'linkedinUrl',
];

function calcCompletion(profile: UserProfile): number {
  const filled = PROFILE_FIELDS.filter((f) => {
    const val = profile[f];
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val);
  });
  return Math.round((filled.length / PROFILE_FIELDS.length) * 100);
}

const NEXT_FIELD_LABELS: Partial<Record<keyof UserProfile, string>> = {
  headline: 'Add a professional headline',
  bio: 'Write a short bio',
  location: 'Add your location',
  experienceLevel: 'Set your experience level',
  targetRoles: 'Add target roles',
  preferredStack: 'Add preferred tech stack',
  salaryMin: 'Set expected salary',
  linkedinUrl: 'Add LinkedIn URL',
};

function getNextHint(profile: UserProfile): string | null {
  for (const f of PROFILE_FIELDS) {
    const val = profile[f];
    const empty = Array.isArray(val) ? val.length === 0 : !val;
    if (empty && f in NEXT_FIELD_LABELS) {
      return NEXT_FIELD_LABELS[f] ?? null;
    }
  }
  return null;
}

export function ProfileCompletionBar({ profile }: ProfileCompletionBarProps) {
  const t = useTranslations('profilePage');
  const pct = calcCompletion(profile);
  const hint = pct < 100 ? getNextHint(profile) : null;

  return (
    <div className={s.root}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('completion.label')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pct}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{ borderRadius: 4, height: 6, mb: 0.75 }}
      />
      {hint && (
        <Typography variant="caption" color="text.secondary">
          {t('completion.hint')} · {hint}
        </Typography>
      )}
    </div>
  );
}
