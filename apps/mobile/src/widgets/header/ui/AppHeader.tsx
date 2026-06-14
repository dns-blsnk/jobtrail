import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, type AvatarUser } from '../../../shared/ui/avatar/Avatar';
import { theme } from '../../../shared/config/theme';
import { NavDrawer } from './NavDrawer';
import { UserSheet } from './UserSheet';

const NAV_ITEMS_LOGGED = ['Dashboard', 'Jobs', 'Applications', 'Analytics'];
const NAV_ITEMS_GUEST = ['Features', 'Pricing', 'About'];

interface AppHeaderProps {
  loggedIn: boolean;
  user?: AvatarUser | null;
  onLogout?: () => void;
  onAddJob?: () => void;
}

export function AppHeader({ loggedIn, user, onLogout, onAddJob }: AppHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const navItems = (loggedIn ? NAV_ITEMS_LOGGED : NAV_ITEMS_GUEST).map((label) => ({
    label,
    onPress: () => {},
  }));

  const logo = <Logo />;

  return (
    <>
      <View style={styles.header}>
        <View style={styles.left}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open navigation menu"
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
            onPress={() => setDrawerOpen(true)}
          >
            <Text style={styles.hamburger}>☰</Text>
          </Pressable>
          <Logo />
        </View>

        <View style={styles.right}>
          {loggedIn ? (
            <>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add job"
                style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
                onPress={onAddJob}
              >
                <Text style={styles.addBtnText}>+</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="User menu"
                style={styles.avatarBtn}
                onPress={() => setSheetOpen(true)}
              >
                <Avatar avatarMode="initials" loggedIn size={36} user={user ?? null} />
              </Pressable>
            </>
          ) : (
            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.loginBtn, pressed && styles.loginBtnPressed]}
              onPress={() => setDrawerOpen(true)}
            >
              <Text style={styles.loginBtnText}>Log in</Text>
            </Pressable>
          )}
        </View>
      </View>

      <NavDrawer
        items={navItems}
        loggedIn={loggedIn}
        logo={logo}
        open={drawerOpen}
        onAddJob={onAddJob}
        onClose={() => setDrawerOpen(false)}
      />

      {loggedIn && user && (
        <UserSheet
          open={sheetOpen}
          user={user}
          onClose={() => setSheetOpen(false)}
          onLogout={() => onLogout?.()}
        />
      )}
    </>
  );
}

function Logo() {
  return (
    <View style={styles.logo}>
      <View style={styles.logoMark}>
        <Text style={styles.logoMarkText}>JT</Text>
      </View>
      <Text style={styles.logoWord}>Jobtrail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    backgroundColor: theme.colors.surface2,
  },
  hamburger: {
    fontSize: 20,
    color: theme.colors.mutedText,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: theme.colors.primaryFg,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  logoWord: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.heading,
    letterSpacing: -0.4,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addBtnPressed: {
    backgroundColor: theme.colors.primaryPress,
  },
  addBtnText: {
    color: theme.colors.primaryFg,
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 24,
  },
  avatarBtn: {
    borderRadius: 999,
    padding: 2,
  },
  loginBtn: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnPressed: {
    backgroundColor: theme.colors.surface2,
  },
  loginBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
});
