import React, { useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommentsBottomSheet, CommentsBottomSheetRef } from '../../components/comments';
import { AnalyticsMiniCard, HeaderBar, ScreenContainer } from '../../components/common';
import { TrendingCard } from '../../components/feed';
import { UserListItem } from '../../components/profile';
import { creators, nearbyBusinesses, nearbyEvents, nearbyTrending } from '../../services/location';
import { feedAnalytics } from '../../services/feed';
import { colors, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'TrendingNearby'>;

const sections = [
  { title: 'Trending now', data: nearbyTrending, heat: 'Very hot' },
  { title: 'Fast growing', data: nearbyEvents, heat: 'Rising' },
  { title: 'Popular nearby', data: nearbyBusinesses, heat: 'Popular' },
  { title: 'Hidden gems', data: nearbyTrending.slice().reverse(), heat: 'Underrated' },
];

export function TrendingNearbyScreen({ navigation }: Props) {
  const commentsSheetRef = useRef<CommentsBottomSheetRef>(null);

  return (
    <>
      <ScreenContainer>
        <HeaderBar title="Trending Nearby" leftAction="back" onLeftPress={() => navigation.goBack()} />

        <View style={styles.analyticsRow}>
          {feedAnalytics.map((item) => (
            <AnalyticsMiniCard key={item.id} stat={item} />
          ))}
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            <FlatList
              data={section.data}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TrendingCard
                  item={item}
                  heat={section.heat}
                  onPressComments={() => commentsSheetRef.current?.present(`trend_${item.id}`, item.title)}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}

        <Text style={styles.title}>Nearby creators</Text>
        {creators.map((creator) => (
          <UserListItem key={creator.id} user={creator} actionLabel="View" />
        ))}
      </ScreenContainer>
      <CommentsBottomSheet ref={commentsSheetRef} />
    </>
  );
}

const styles = StyleSheet.create({
  analyticsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
});
