import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { ScreenContainer } from '../../components/common';
import { creators, hashtags, nearbyBusinesses } from '../../services/location';
import { posts } from '../../services/feed';
import { colors, radii, spacing, typography } from '../../theme';
import { ExploreStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Explore'>;

export function ExploreScreen({ navigation }: Props) {
  const [query] = useState('');

  return (
    <ScreenContainer>
      <Text style={styles.title}>Explore nearby</Text>
      <Text style={styles.subtitle}>Find creators, places, and activity in your radius.</Text>

      <Pressable onPress={() => navigation.navigate('Search')} style={styles.searchButton}>
        <Search size={18} color={colors.textMuted} />
        <Text style={styles.searchText}>{query || 'Search people, hashtags, places'}</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Trending hashtags</Text>
      <View style={styles.rowWrap}>
        {hashtags.map((tag) => (
          <Pressable
            key={tag.id}
            style={styles.hashChip}
            onPress={() => navigation.navigate('SearchResults', { query: tag.label, category: 'Hashtags' })}
          >
            <Text style={styles.hashText}>{tag.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle label="Recommended creators" action="Dedicated search" onPress={() => navigation.navigate('Search')} />
      {creators.map((creator) => (
        <Pressable
          key={creator.id}
          style={styles.creatorCard}
          onPress={() => navigation.navigate('PublicProfile', { userId: creator.id })}
        >
          <Image source={{ uri: creator.avatar }} style={styles.creatorAvatar} />
          <View style={styles.creatorContent}>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorMeta}>{creator.handle} • {creator.distance}</Text>
            <Text style={styles.creatorVibe}>{creator.vibe}</Text>
          </View>
          <Text style={styles.followPill}>View</Text>
        </Pressable>
      ))}

      <SectionTitle
        label="Nearby places"
        action="Open discovery"
        onPress={() => navigation.navigate('NearbyDiscovery')}
      />
      <FlatList
        data={nearbyBusinesses}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.placeCard} onPress={() => navigation.navigate('SearchResults', { query: item.title, category: 'Places' })}>
            <Image source={{ uri: item.image }} style={styles.placeImage} />
            <Text style={styles.placeTitle}>{item.title}</Text>
            <Text style={styles.placeMeta}>{item.distance} • {item.meta}</Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <SectionTitle label="Discover grid" />
      <View style={styles.grid}>
        {posts.map((post) => (
          <Image key={post.id} source={{ uri: post.media }} style={styles.gridItem} />
        ))}
      </View>
    </ScreenContainer>
  );
}

function SectionTitle({
  label,
  action,
  onPress,
}: {
  label: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {action ? (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    ...typography.title,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.lg,
    ...typography.body,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.lg,
  },
  searchText: {
    color: colors.textMuted,
    ...typography.body,
  },
  sectionTitle: {
    color: colors.text,
    ...typography.heading,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  hashChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  hashText: {
    color: colors.text,
    ...typography.caption,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionAction: {
    color: colors.accent,
    ...typography.caption,
  },
  creatorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  creatorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  creatorContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  creatorName: {
    color: colors.text,
    ...typography.subheading,
  },
  creatorMeta: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  creatorVibe: {
    color: colors.text,
    marginTop: 4,
    ...typography.caption,
  },
  followPill: {
    color: colors.background,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    overflow: 'hidden',
    ...typography.caption,
  },
  placeCard: {
    width: 220,
    marginRight: spacing.md,
  },
  placeImage: {
    width: '100%',
    height: 150,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
  },
  placeTitle: {
    color: colors.text,
    ...typography.subheading,
  },
  placeMeta: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
});
