import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';

export interface AvatarUser {
  name: string | null;
  email: string;
}

export type AvatarMode = 'photo' | 'initials' | 'default';

interface AvatarProps {
  user?: AvatarUser | null;
  loggedIn?: boolean;
  avatarMode?: AvatarMode;
  size?: number;
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

function hslToHex(h: number, s: number, l: number): string {
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function Avatar({ user, loggedIn = false, avatarMode = 'photo', size = 38 }: AvatarProps) {
  const circleStyle = { width: size, height: size, borderRadius: size / 2 };

  if (!loggedIn || !user) {
    return (
      <View style={[styles.default, circleStyle]}>
        <Text style={[styles.defaultIcon, { fontSize: size * 0.4 }]}>👤</Text>
      </View>
    );
  }

  if (avatarMode === 'default') {
    return (
      <View style={[styles.default, circleStyle]}>
        <Text style={[styles.defaultIcon, { fontSize: size * 0.4 }]}>👤</Text>
      </View>
    );
  }

  const hue = hueFromEmail(user.email);
  const bg = hslToHex(hue, 70, 88);
  const fg = hslToHex(hue, 55, 35);
  const initials = initialsFromEmail(user.email);

  return (
    <View style={[circleStyle, { backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }]}>
      <Text style={{ color: fg, fontSize: size * 0.38, fontWeight: '700', letterSpacing: -0.3 }}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: theme.colors.surface3,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultIcon: {
    color: theme.colors.metaText,
  },
});
