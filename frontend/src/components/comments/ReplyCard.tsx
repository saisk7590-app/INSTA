import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Comment } from '../../types/social';
import { CommentCard } from './CommentCard';

type Props = {
  reply: Comment;
};

export function ReplyCard({ reply }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.content}>
        <CommentCard comment={reply} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 44,
    marginTop: -2,
  },
  line: {
    width: 1,
    backgroundColor: colors.borderStrong,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
});
