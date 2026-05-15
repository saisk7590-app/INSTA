import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { AnalyticsStat } from '../../types/social';

type Props = {
  stat: AnalyticsStat;
};

export function AnalyticsMiniCard({ stat }: Props) {
  const toneColor =
    stat.tone === 'accent'
      ? colors.accent
      : stat.tone === 'warning'
        ? colors.warning
        : colors.primarySoft;

  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color: toneColor }]}>{stat.value}</Text>
      <Text style={styles.label}>{stat.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 108,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  value: {
    ...typography.heading,
  },
  label: {
    marginTop: 4,
    color: colors.textSecondary,
    ...typography.caption,
  },
});
