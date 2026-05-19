import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UserAvatar } from '../common';
import { colors, radii, spacing, typography } from '../../theme';
import { Creator } from '../../types/social';

type Props = {
  user: Creator;
  actionLabel?: string;
  onPress?: () => void;
};

export function UserListItem({ user, actionLabel = 'Follow', onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <UserAvatar uri={user.avatar} size={48} />
        <View style={styles.textWrap}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>{user.handle} • {user.distance}</Text>
          <Text style={styles.subtext}>{user.mutuals ?? user.vibe}</Text>
        </View>
      </View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    flex: 1,
  },
  textWrap: {
    flex: 1,
  },
  name: {
    color: colors.text,
    ...typography.subheading,
  },
  meta: {
    color: colors.textSecondary,
    marginTop: 2,
    ...typography.caption,
  },
  subtext: {
    color: colors.textMuted,
    marginTop: 4,
    ...typography.caption,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  buttonText: {
    color: colors.text,
    ...typography.caption,
  },
});
