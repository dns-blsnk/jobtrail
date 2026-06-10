import { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, type AvatarUser } from '../../../shared/ui/avatar/Avatar';
import { theme } from '../../../shared/config/theme';

interface UserSheetProps {
  open: boolean;
  onClose: () => void;
  user: AvatarUser;
  onLogout: () => void;
}

export function UserSheet({ open, onClose, user, onLogout }: UserSheetProps) {
  const translateY = useRef(new Animated.Value(400)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 400, duration: 260, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [open, translateY, opacity]);

  return (
    <Modal transparent animationType="none" visible={open} onRequestClose={onClose}>
      <Animated.View style={[styles.scrim, { opacity }]}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />

        <View style={styles.identity}>
          <Avatar avatarMode="initials" loggedIn size={44} user={user} />
          <View style={styles.identityText}>
            <Text numberOfLines={1} style={styles.name}>{user.name ?? 'User'}</Text>
            <Text numberOfLines={1} style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <MenuRow icon="👤" label="Profile" onPress={onClose} />
        <MenuRow badge="12" icon="🔖" label="My applications" onPress={onClose} />
        <MenuRow icon="💳" label="Subscription" meta="Free" onPress={onClose} />
        <MenuRow icon="⚙️" label="Settings" onPress={onClose} />

        <View style={styles.divider} />

        <MenuRow danger icon="🚪" label="Log out" onPress={() => { onClose(); onLogout(); }} />

        <View style={styles.safeBottom} />
      </Animated.View>
    </Modal>
  );
}

interface MenuRowProps {
  icon: string;
  label: string;
  badge?: string;
  meta?: string;
  danger?: boolean;
  onPress: () => void;
}

function MenuRow({ icon, label, badge, meta, danger, onPress }: MenuRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        danger && styles.rowDanger,
        pressed && (danger ? styles.rowDangerPressed : styles.rowPressed),
      ]}
      onPress={onPress}
    >
      <Text style={styles.rowIcon}>{icon}</Text>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      {meta && <Text style={styles.meta}>{meta}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(32, 33, 46, 0.42)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 20,
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 999,
    backgroundColor: theme.colors.border2,
    alignSelf: 'center',
    marginTop: 9,
    marginBottom: 3,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    paddingBottom: 14,
  },
  identityText: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.heading,
  },
  email: {
    fontSize: 12.5,
    color: theme.colors.metaText,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  rowPressed: {
    backgroundColor: theme.colors.surface2,
  },
  rowDanger: {},
  rowDangerPressed: {
    backgroundColor: theme.colors.dangerSoft,
  },
  rowIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    color: theme.colors.text,
  },
  rowLabelDanger: {
    color: theme.colors.danger,
  },
  badge: {
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  meta: {
    fontSize: 11.5,
    color: theme.colors.metaText,
  },
  safeBottom: {
    height: 20,
  },
});
