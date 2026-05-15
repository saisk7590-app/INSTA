import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Heart, Reply } from 'lucide-react-native';
import { UserAvatar } from '../common';
import { colors, radii, spacing, typography } from '../../theme';
import { Comment } from '../../types/social';

type Props = {
  comment: Comment;
  nested?: boolean;
};

export function CommentCard({ comment, nested = false }: Props) {
  return (
    <View style={[styles.wrapper, nested && styles.nested]}>
      <View style={styles.row}>
        <UserAvatar uri={comment.avatar} size={38} />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.author}>{comment.userName} <Text style={styles.handle}>{comment.handle}</Text></Text>
            <Text style={styles.text}>{comment.text}</Text>
          </View>
          <View style={styles.actions}>
            <Text style={styles.time}>{comment.timestamp}</Text>
            <Pressable style={styles.action}>
              <Heart size={14} color={colors.textMuted} />
              <Text style={styles.actionText}>{comment.likes}</Text>
            </Pressable>
            <Pressable style={styles.action}>
              <Reply size={14} color={colors.textMuted} />
              <Text style={styles.actionText}>Reply</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {comment.replies?.map((reply) => (
        <CommentCard key={reply.id} comment={reply} nested />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  nested: {
    marginLeft: 42,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  author: {
    color: colors.text,
    ...typography.caption,
  },
  handle: {
    color: colors.textMuted,
  },
  text: {
    marginTop: 6,
    color: colors.textSecondary,
    ...typography.body,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
    paddingLeft: spacing.sm,
  },
  time: {
    color: colors.textMuted,
    ...typography.caption,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: colors.textMuted,
    ...typography.caption,
  },
});
