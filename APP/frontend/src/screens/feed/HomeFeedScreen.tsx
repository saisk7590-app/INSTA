import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowRight } from 'lucide-react-native';
import { CommentsBottomSheet, CommentsBottomSheetRef } from '../../components/comments';
import { AnalyticsMiniCard, HeaderBar, ScreenContainer } from '../../components/common';
import { NearbyCard } from '../../components/explore';
import { PostCard, StoryBubble } from '../../components/feed';
import { feedAnalytics, stories } from '../../services/feed';
import { getFeedPosts, getNearbyFeedPosts } from '../../services/postService';
import { getMyLocation } from '../../services/geoService';
import { Post } from '../../types/social';
import { nearbyTrending } from '../../services/location';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<FeedStackParamList, 'HomeFeed'>;
type FeedTab = 'Nearby' | 'Following' | 'Trending' | 'Discover';

const FEED_TABS: FeedTab[] = ['Nearby', 'Following', 'Trending', 'Discover'];
const PAGE_SIZE = 8;

export function HomeFeedScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [activeTab, setActiveTab] = useState<FeedTab>('Nearby');
  const [livePosts, setLivePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState('No posts found.');
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);

  const loadFeed = useCallback(
    async (reset = true) => {
      if (!user?.id) return;

      const offset = reset ? 0 : livePosts.length;
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        let data: Post[] = [];

        if (activeTab === 'Nearby' || activeTab === 'Trending' || activeTab === 'Discover') {
          const storedLocation = await getMyLocation(user.id);
          const latitude = storedLocation?.currentLatitude;
          const longitude = storedLocation?.currentLongitude;

          if (latitude === null || latitude === undefined || longitude === null || longitude === undefined) {
            setEmptyMessage('Turn on location to see posts around you.');
            data = [];
          } else {
            const radius = activeTab === 'Nearby' ? 5 : activeTab === 'Trending' ? 10 : 25;
            data = await getNearbyFeedPosts({
              latitude,
              longitude,
              radius,
              limit: PAGE_SIZE,
              offset,
            });
            setEmptyMessage('No nearby posts yet.');
          }
        } else {
          data = await getFeedPosts(user.id, PAGE_SIZE, offset);
          setEmptyMessage('No following posts yet.');
        }

        setLivePosts((current) => (reset ? data : [...current, ...data]));
        setHasMore(data.length === PAGE_SIZE);
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [activeTab, livePosts.length, user?.id]
  );

  useEffect(() => {
    setLivePosts([]);
    setHasMore(true);
    loadFeed(true);
  }, [activeTab, user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadFeed(true);
  };

  const loadMore = () => {
    if (!loading && !loadingMore && hasMore && livePosts.length > 0) {
      loadFeed(false);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPressUser={() =>
        navigation.getParent()?.navigate('ExploreTab', {
          screen: 'PublicProfile',
          params: { userId: item.userId || '' },
        })
      }
      onPressPost={() => navigation.navigate('PostDetail', { postId: item.id })}
      onPressComments={() => commentsSheetRef.current?.present(item.id, item.userName)}
    />
  );

  const renderHeader = () => (
    <>
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

      <View style={styles.tabs}>
        {FEED_TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );

  return (
    <>
      <ScreenContainer withScroll={false} contentContainerStyle={styles.screenContent}>
        <FlatList
          data={livePosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color={colors.accent} style={styles.loading} />
            ) : (
              <Text style={styles.emptyText}>{emptyMessage}</Text>
            )
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.accent} style={styles.footerLoader} /> : null
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.35}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
        />
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
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
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

const stylesFactory = (colors: any) => StyleSheet.create({
  screenContent: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 140,
  },
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
  tabs: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabActive: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(49,208,170,0.12)',
  },
  tabText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  tabTextActive: {
    color: colors.accent,
  },
  loading: {
    marginTop: spacing.xl,
  },
  footerLoader: {
    marginVertical: spacing.lg,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
    ...typography.body,
  },
});
