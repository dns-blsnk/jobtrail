import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';

export interface SegmentedOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (next: T) => void;
}

export const SegmentedControl = <T extends string>({ options, value, onChange }: SegmentedControlProps<T>) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.tabBackground,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: theme.colors.tabBackground,
    flexDirection: 'row',
    gap: 1,
    padding: 2,
    height: 36,
  },
  segment: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  segmentActive: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.borderStrong,
  },
  label: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  labelActive: {
    color: theme.colors.tabActiveText,
  },
  labelInactive: {
    color: theme.colors.tabInactiveText,
  },
});
