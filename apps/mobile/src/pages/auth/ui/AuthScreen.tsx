import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../shared/config/theme';
import { AuthFormSection } from '../../../widgets/auth-form/ui/AuthFormSection';

const AuthScreen = () => {
  const patternCells = useMemo(() => Array.from({ length: 42 }, (_, index) => index), []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View pointerEvents="none" style={styles.patternLayer}>
        <View style={styles.patternGrid}>
          {patternCells.map((cell) => (
            <View key={cell} style={styles.patternCell} />
          ))}
        </View>
        <View style={styles.patternFadeVertical} />
        <View style={styles.patternFadeHorizontal} />
        <View style={styles.patternFadeCircle} />
      </View>

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.brand}>
            <Text style={styles.brandMark}>*</Text>
          </View>
          <AuthFormSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  content: {
    width: 327,
    alignSelf: 'center',
    paddingTop: 24,
    gap: 24,
  },
  brand: {
    width: 27,
    height: 27,
    borderRadius: 7,
    alignSelf: 'center',
    backgroundColor: '#375DFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMark: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
  },
  patternLayer: {
    position: 'absolute',
    top: -26,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  patternGrid: {
    width: 375,
    height: 257,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  patternCell: {
    width: 51.188,
    height: 51.188,
    borderWidth: 0.53,
    borderColor: '#F0F0F0',
    borderRadius: 5.65,
  },
  patternFadeVertical: {
    position: 'absolute',
    top: -2,
    left: 0,
    width: 154,
    height: 287,
    backgroundColor: 'rgba(255,255,255,0.82)',
  },
  patternFadeHorizontal: {
    position: 'absolute',
    left: 0,
    bottom: -39,
    width: 287,
    height: 154,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  patternFadeCircle: {
    position: 'absolute',
    top: -199,
    left: 102,
    width: 326,
    height: 326,
    borderRadius: 163,
    backgroundColor: 'rgba(255,255,255,0.83)',
  },
});
