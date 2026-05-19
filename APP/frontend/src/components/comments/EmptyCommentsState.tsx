import React from 'react';
import { MessageCircleMore } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export function EmptyCommentsState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MessageCircleMore size={24} color={colors.textSecondary} />
      </View>
      <Text style={styles.title}>No comments yet</Text>
      <Text style={styles.body}>Start the local conversation and be the first to react.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    ...typography.subheading,
  },
  body: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },
});
