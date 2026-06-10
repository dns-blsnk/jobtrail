import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '../../../shared/config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

interface NavItem {
  label: string;
  onPress: () => void;
}

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  loggedIn: boolean;
  onSignUp?: () => void;
  onLogin?: () => void;
  onAddJob?: () => void;
  logo: React.ReactNode;
}

export function NavDrawer({ open, onClose, items, loggedIn, onSignUp, onLogin, onAddJob, logo }: NavDrawerProps) {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 280, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, { toValue: -DRAWER_WIDTH, duration: 260, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [open, translateX, opacity]);

  return (
    <Modal transparent animationType="none" visible={open} onRequestClose={onClose}>
      <View style={styles.container}>
        <Animated.View style={[styles.scrim, { opacity }]}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          <View style={styles.drawerHeader}>
            {logo}
            <Pressable
              accessibilityRole="button"
              style={styles.closeBtn}
              onPress={onClose}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.navList} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <Pressable
                key={item.label}
                style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
                onPress={() => { item.onPress(); onClose(); }}
              >
                <Text style={styles.navItemLabel}>{item.label}</Text>
                <Text style={styles.navItemChevron}>›</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.drawerFooter}>
            {loggedIn ? (
              <Pressable
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
                onPress={() => { onAddJob?.(); onClose(); }}
              >
                <Text style={styles.primaryBtnText}>+ Add job</Text>
              </Pressable>
            ) : (
              <>
                <Pressable
                  style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
                  onPress={() => { onSignUp?.(); onClose(); }}
                >
                  <Text style={styles.primaryBtnText}>Sign up</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [styles.outlineBtn, pressed && styles.outlineBtnPressed]}
                  onPress={() => { onLogin?.(); onClose(); }}
                >
                  <Text style={styles.outlineBtnText}>Log in</Text>
                </Pressable>
              </>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(32, 33, 46, 0.42)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: theme.colors.surface,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
    paddingTop: 14,
    flexDirection: 'column',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: theme.colors.mutedText,
  },
  navList: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 2,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 11,
  },
  navItemPressed: {
    backgroundColor: theme.colors.surface2,
  },
  navItemLabel: {
    fontSize: 15.5,
    fontWeight: '600',
    color: theme.colors.text,
  },
  navItemChevron: {
    fontSize: 20,
    color: theme.colors.metaText,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: 14,
    gap: 9,
  },
  primaryBtn: {
    height: 40,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnPressed: {
    backgroundColor: theme.colors.primaryPress,
  },
  primaryBtnText: {
    color: theme.colors.primaryFg,
    fontSize: 14.5,
    fontWeight: '600',
  },
  outlineBtn: {
    height: 40,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border2,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineBtnPressed: {
    backgroundColor: theme.colors.surface2,
  },
  outlineBtnText: {
    color: theme.colors.text,
    fontSize: 14.5,
    fontWeight: '600',
  },
});
