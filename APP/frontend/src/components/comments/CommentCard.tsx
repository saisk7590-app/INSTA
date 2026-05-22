import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Heart, Reply, SmilePlus } from 'lucide-react-native';
import { UserAvatar } from '../common';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { Comment } from '../../types/social';

type Props = {
  comment: Comment;
};

export function CommentCard({ comment }: Props) {
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <UserAvatar uri={comment.avatar} size={40} />
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.author}>{comment.userName}</Text>
              <Text style={styles.time}>{comment.timestamp}</Text>
            </View>
            <Text style={styles.handle}>{comment.handle}{comment.distance ? ` • ${comment.distance}` : ''}</Text>
            <Text style={styles.text}>{comment.text}</Text>
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.action}>
              <Heart size={14} color={colors.textMuted} />
              <Text style={styles.actionText}>{comment.likes}</Text>
            </Pressable>
            <Pressable style={styles.action}>
              <Reply size={14} color={colors.textMuted} />
              <Text style={styles.actionText}>Reply</Text>
            </Pressable>
            <Pressable style={styles.action}>
              <SmilePlus size={14} color={colors.textMuted} />
              <Text style={styles.actionText}>React</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const stylesFactory = (colors: any, gradients: any, themeMode: string) => StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: themeMode === 'light' ? 'rgba(10,12,18,0.03)' : 'rgba(255,255,255,0.04)',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: colors.text,
    ...typography.body,
    fontWeight: '700',
  },
  time: {
    color: colors.textMuted,
    ...typography.caption,
  },
  handle: {
    color: colors.textMuted,
    marginTop: 2,
    ...typography.caption,
  },
  text: {
    marginTop: 8,
    color: colors.textSecondary,
    ...typography.body,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    paddingLeft: spacing.sm,
  },
  action: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  actionText: {
    color: colors.textMuted,
    ...typography.caption,
  },
});
