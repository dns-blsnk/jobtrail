'use client';

import MuiAvatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
      <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
    </MuiAvatar>
  );
}
