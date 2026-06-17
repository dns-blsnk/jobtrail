'use client';

import MuiAvatar from '@mui/material/Avatar';
import { Icon } from '@/shared/ui/icon/icon';

export interface AvatarUser {
  name: string | null;
  email: string;
  photo?: string | null;
}

interface AvatarProps {
  user?: AvatarUser | null;
  loggedIn?: boolean;
  size?: number;
}

export function Avatar({ user, loggedIn = false, size = 38 }: AvatarProps) {
  const sx = { width: size, height: size };
  const photoSrc = loggedIn && user?.photo ? user.photo : undefined;

  return (
    <MuiAvatar alt={user?.name ?? user?.email ?? undefined} src={photoSrc} sx={sx}>
      <Icon name="userCircle" size={Math.round(size * 0.6)} strokeWidth={1.6} />
    </MuiAvatar>
  );
}
