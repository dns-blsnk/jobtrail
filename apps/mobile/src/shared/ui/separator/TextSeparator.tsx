import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';

interface TextSeparatorProps {
  label: string;
}

export const TextSeparator = ({ label }: TextSeparatorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderSoft,
  },
  text: {
    color: theme.colors.mutedText,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
});
