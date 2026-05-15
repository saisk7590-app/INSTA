import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserAvatar } from '../common';
import { colors, gradients, radii, shadows, spacing, typography } from '../../theme';
import { Post } from '../../types/social';

type PostCardProps = {
  post: Post;
  onPressUser?: () => void;
  onPressPost?: () => void;
  onPressComments?: () => void;
};

export function PostCard({ post, onPressUser, onPressPost, onPressComments }: PostCardProps) {
  return (
    <LinearGradient colors={gradients.card} style={styles.card}>
      <View style={styles.header}>
        <Pressable onPress={onPressUser} style={styles.userRow}>
          <UserAvatar uri={post.avatar} size={42} />
          <View>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.meta}>{post.distance} • {post.timestamp}</Text>
          </View>
        </Pressable>
        <Text style={styles.location}>{post.location}</Text>
      </View>

      <Pressable onPress={onPressPost}>
        <Image source={{ uri: post.media }} style={styles.media} />
      </Pressable>

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Action icon={<Heart size={18} color={colors.text} />} value={post.likes} />
          <Pressable onPress={onPressComments}>
            <Action icon={<MessageCircle size={18} color={colors.text} />} value={post.comments} />
          </Pressable>
          <Action icon={<Send size={18} color={colors.text} />} value={post.shares} />
        </View>
        <Action icon={<Bookmark size={18} color={colors.text} />} value={post.saves} />
      </View>

      <Text style={styles.caption}>
        <Text style={styles.handle}>{post.handle}</Text> {post.caption}
      </Text>
    </LinearGradient>
  );
}

function Action({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <View style={styles.actionButton}>
      {icon}
      <Text style={styles.actionText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  userName: {
    color: colors.text,
    ...typography.subheading,
  },
  meta: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  location: {
    color: colors.accent,
    ...typography.caption,
  },
  media: {
    width: '100%',
    height: 320,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  actionText: {
    color: colors.text,
    ...typography.caption,
  },
  caption: {
    color: colors.textSecondary,
    ...typography.body,
  },
  handle: {
    color: colors.text,
    fontWeight: '700',
  },
});
