'use client';

import { Icon } from '@/shared/ui/icon/icon';
import s from './avatar.module.scss';

export interface AvatarUser {
  name: string | null;
  email: string;
  photo?: string | null;
}

export type AvatarMode = 'photo' | 'initials' | 'default';

interface AvatarProps {
  user?: AvatarUser | null;
  loggedIn?: boolean;
  avatarMode?: AvatarMode;
  size?: number;
  ring?: boolean;
}

function initialsFromEmail(email: string): string {
  const local = (email.split('@')[0] ?? '').replace(/[._-]+/g, ' ').trim();
  const parts = local.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  return (local.slice(0, 2) || '?').toUpperCase();
}

function hueFromEmail(email: string): number {
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) % 360;
  return 200 + (h % 110);
}

export function Avatar({ user, loggedIn = false, avatarMode = 'photo', size = 38, ring = false }: AvatarProps) {
  const style: React.CSSProperties = { width: size, height: size };
  if (ring) style.boxShadow = '0 0 0 2px var(--surface), 0 0 0 3.5px var(--accent)';

  if (!loggedIn || !user) {
    return (
      <span className={s.root} style={style} data-variant="default">
        <Icon name="user" size={Math.round(size * 0.54)} strokeWidth={1.9} />
      </span>
    );
  }

  if (avatarMode === 'photo' && user.photo) {
    return (
      <span className={s.root} style={style}>
        <img
          alt={user.name ?? user.email}
          src={user.photo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </span>
    );
  }

  if (avatarMode === 'default') {
    return (
      <span className={s.root} style={style} data-variant="default">
        <Icon name="user" size={Math.round(size * 0.54)} strokeWidth={1.9} />
      </span>
    );
  }

  const hue = hueFromEmail(user.email);
  const initials = initialsFromEmail(user.email);

  return (
    <span
      className={s.root}
      style={{
        ...style,
        background: `oklch(0.93 0.05 ${hue})`,
        color: `oklch(0.42 0.15 ${hue})`,
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.4,
        letterSpacing: '-0.01em',
      }}
    >
      {initials}
    </span>
  );
}
