import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { PrivacyOption } from '../../types/social';

type Props = {
  option: PrivacyOption;
};

export function PrivacyOptionCard({ option }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <ShieldCheck size={18} color={colors.accent} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{option.title}</Text>
        <Text style={styles.description}>{option.description}</Text>
      </View>
      <Text style={styles.value}>{option.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.text,
    ...typography.body,
  },
  description: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
  value: {
    color: colors.accent,
    ...typography.caption,
  },
});
