'use client';

import MuiAvatar from '@mui/material/Avatar';

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
  const photoSrc = loggedIn && user?.photo ? user.photo : undefined;

  return (
    <MuiAvatar
      alt={user?.name ?? user?.email ?? undefined}
      src={photoSrc}
      sx={{ width: size, height: size, bgcolor: 'grey.400' }}
    />
  );
}
