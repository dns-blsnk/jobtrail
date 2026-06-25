'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useAnalytics } from '@/shared/analytics/use-analytics';
import { useUserProfile } from '@/entities/user-profile/model/use-profile';
import type { UserProfile } from '@/entities/user-profile/model/types';
import { ProfileCard } from '@/widgets/profile-card/ui/profile-card';
import { ProfileCompletionBar } from '@/widgets/profile-completion-bar/ui/profile-completion-bar';
import { ProfileCompletionBarSkeleton } from '@/widgets/profile-completion-bar/ui/profile-completion-bar-skeleton';
import { ProfileBasicInfo } from '@/widgets/profile-basic-info/ui/profile-basic-info';
import { ProfileBasicInfoSkeleton } from '@/widgets/profile-basic-info/ui/profile-basic-info-skeleton';
import { ProfileSearchStatus } from '@/widgets/profile-search-status/ui/profile-search-status';
import { ProfileSearchStatusSkeleton } from '@/widgets/profile-search-status/ui/profile-search-status-skeleton';
import { ProfileCareerPrefs } from '@/widgets/profile-career-prefs/ui/profile-career-prefs';
import { ProfileCareerPrefsSkeleton } from '@/widgets/profile-career-prefs/ui/profile-career-prefs-skeleton';
import { ProfileLinks } from '@/widgets/profile-links/ui/profile-links';
import { ProfileLinksSkeleton } from '@/widgets/profile-links/ui/profile-links-skeleton';
import s from './profile-page.module.scss';

const COMPLETION_FIELDS: (keyof UserProfile)[] = [
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
  const filled = COMPLETION_FIELDS.filter((f) => {
    const val = profile[f];
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val);
  });
  return Math.round((filled.length / COMPLETION_FIELDS.length) * 100);
}

interface ProfileUser {
  email?: string | null;
  name?: string | null;
}

interface ProfilePageClientProps {
  user: ProfileUser;
}

export function ProfilePageClient({ user }: ProfilePageClientProps) {
  const t = useTranslations('profilePage');
  const { data: profile, isLoading } = useUserProfile();
  const { capture } = useAnalytics();
  const prevPctRef = useRef<number | null>(null);

  useEffect(() => {
    if (!profile) return;
    const pct = calcCompletion(profile);
    if (prevPctRef.current !== null && prevPctRef.current !== pct) {
      capture('profile_completion_changed', { from: prevPctRef.current, to: pct });
    }
    prevPctRef.current = pct;
  }, [profile, capture]);

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <div className={s.pageHeader}>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.subtitle}>{t('subtitle')}</p>
        </div>

        <ProfileCard user={user} />

        {isLoading || !profile ? (
          <>
            <ProfileCompletionBarSkeleton />
            <ProfileBasicInfoSkeleton />
            <ProfileSearchStatusSkeleton />
            <ProfileCareerPrefsSkeleton />
            <ProfileLinksSkeleton />
          </>
        ) : (
          <>
            <ProfileCompletionBar profile={profile} />
            <ProfileBasicInfo profile={profile} />
            <ProfileSearchStatus profile={profile} />
            <ProfileCareerPrefs profile={profile} />
            <ProfileLinks profile={profile} />
          </>
        )}
      </div>
    </div>
  );
}
