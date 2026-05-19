import React, { useRef } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react-native';
import { CommentsBottomSheet, CommentsBottomSheetRef } from '../../components/comments';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { NearbyCard } from '../../components/explore';
import { posts } from '../../services/feed';
import { nearbyTrending } from '../../services/location';
import { colors, radii, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'PostDetail'>;

export function PostDetailScreen({ route, navigation }: Props) {
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);
  const post = posts.find((item) => item.id === route.params.postId) ?? posts[0];

  return (
    <>
      <ScreenContainer>
        <HeaderBar title={post.userName} leftAction="back" onLeftPress={() => navigation.goBack()} />

        <Image source={{ uri: post.media }} style={styles.heroMedia} />

        <View style={styles.statsRow}>
          <Action icon={<Heart size={18} color={colors.text} />} value={post.likes.toString()} />
          <Pressable onPress={() => commentsSheetRef.current?.present(post.id, post.userName)}>
            <Action icon={<MessageCircle size={18} color={colors.text} />} value={post.comments.toString()} />
          </Pressable>
          <Action icon={<Send size={18} color={colors.text} />} value={post.shares.toString()} />
          <Action icon={<Bookmark size={18} color={colors.text} />} value={post.saves.toString()} />
        </View>

        <View style={styles.card}>
          <Text style={styles.location}>{post.location} • {post.distance}</Text>
          <Text style={styles.caption}><Text style={styles.handle}>{post.handle}</Text> {post.caption}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Comments preview</Text>
          <Pressable onPress={() => commentsSheetRef.current?.present(post.id, post.userName)}>
            <Text style={styles.link}>View all {post.comments} comments</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Nearby related posts</Text>
        <FlatList
          data={nearbyTrending}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NearbyCard
              item={item}
              onPressComments={() => commentsSheetRef.current?.present(`trend_${item.id}`, item.title)}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ScreenContainer>
      <CommentsBottomSheet ref={commentsSheetRef} />
    </>
  );
}

function Action({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <View style={styles.actionButton}>
      {icon}
      <Text style={styles.actionText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroMedia: {
    width: '100%',
    height: 420,
    borderRadius: radii.lg,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    color: colors.text,
    ...typography.caption,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  location: {
    color: colors.accent,
    marginBottom: spacing.sm,
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
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
  link: {
    color: colors.primarySoft,
    ...typography.body,
  },
});
