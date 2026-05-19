import React, { useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight } from 'lucide-react-native';
import { CommentsBottomSheet, CommentsBottomSheetRef } from '../../components/comments';
import { AnalyticsMiniCard, HeaderBar, ScreenContainer } from '../../components/common';
import { NearbyCard } from '../../components/explore';
import { PostCard, StoryBubble } from '../../components/feed';
import { feedAnalytics, posts, stories } from '../../services/feed';
import { nearbyTrending } from '../../services/location';
import { colors, radii, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'HomeFeed'>;

export function HomeFeedScreen({ navigation }: Props) {
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);

  return (
    <>
      <ScreenContainer>
        <HeaderBar
          title="Around"
          leftAction="create"
          rightAction="notifications"
          onLeftPress={() => navigation.navigate('CreatePost')}
          onRightPress={() => navigation.navigate('Notifications')}
        />

        <Text style={styles.hero}>What's happening around me right now?</Text>

        <FlatList
          data={stories}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StoryBubble story={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stories}
        />

        <FlatList
          data={feedAnalytics}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AnalyticsMiniCard stat={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.analytics}
        />

        <SectionHeader
          title="Nearby trending"
          actionLabel="Open pulse"
          onPress={() => navigation.navigate('TrendingNearby')}
        />

        <FlatList
          data={nearbyTrending}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NearbyCard
              item={item}
              onPressComments={() =>
                commentsSheetRef.current?.present(`trend_${item.id}`, item.title)
              }
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <SectionHeader title="Feed" />
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPressUser={() =>
              navigation.getParent()?.navigate('ExploreTab', {
                screen: 'PublicProfile',
                params: { userId: 'u2' },
              })
            }
            onPressPost={() => navigation.navigate('PostDetail', { postId: post.id })}
            onPressComments={() => commentsSheetRef.current?.present(post.id, post.userName)}
          />
        ))}
      </ScreenContainer>
      <CommentsBottomSheet ref={commentsSheetRef} />
    </>
  );
}

function SectionHeader({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onPress} style={styles.linkRow}>
          <Text style={styles.link}>{actionLabel}</Text>
          <ArrowRight size={14} color={colors.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    ...typography.body,
  },
  stories: {
    paddingBottom: spacing.lg,
  },
  analytics: {
    paddingBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    ...typography.heading,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(49,208,170,0.08)',
  },
  link: {
    color: colors.accent,
    ...typography.caption,
  },
  horizontalList: {
    paddingBottom: spacing.lg,
  },
});
