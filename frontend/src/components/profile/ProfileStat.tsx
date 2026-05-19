import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { ProfileStatItem } from '../../types/social';

type ProfileStatProps = {
  stat: ProfileStatItem;
};

export function ProfileStat({ stat }: ProfileStatProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.label}>{stat.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  value: {
    color: colors.text,
    ...typography.heading,
  },
  label: {
    color: colors.textSecondary,
    ...typography.caption,
  },
});
