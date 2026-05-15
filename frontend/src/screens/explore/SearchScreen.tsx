import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search as SearchIcon } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { SearchSuggestionCard } from '../../components/explore';
import { creators, recentSearches, searchResults, searchTabs, trendingSearches } from '../../services/location';
import { colors, radii, spacing, typography } from '../../theme';
import { ExploreStackParamList } from '../../types/navigation';
import { SearchCategory } from '../../types/social';

type Props = NativeStackScreenProps<ExploreStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('Top');

  const openResults = (value: string) => {
    navigation.navigate('SearchResults', {
      query: value || 'nearby',
      category,
    });
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Search" leftAction="back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.searchWrap}>
        <SearchIcon size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search people, places, hashtags"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          onSubmitEditing={() => openResults(query)}
          autoFocus
        />
      </View>

      <View style={styles.tabs}>
        {searchTabs.map((tab) => {
          const active = tab === category;
          return (
            <Pressable key={tab} onPress={() => setCategory(tab)} style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Recent searches</Text>
      <View style={styles.chips}>
        {recentSearches.map((item) => (
          <Pressable key={item} onPress={() => openResults(item)} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Trending now</Text>
      <View style={styles.chips}>
        {trendingSearches.map((item) => (
          <Pressable key={item} onPress={() => openResults(item)} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Suggested users</Text>
      {creators.map((creator) => (
        <SearchSuggestionCard
          key={creator.id}
          item={{
            id: creator.id,
            type: 'user',
            title: creator.name,
            subtitle: `${creator.handle} • ${creator.vibe}`,
            distance: creator.distance,
          }}
          onPress={() => navigation.navigate('PublicProfile', { userId: creator.id })}
        />
      ))}

      <Text style={styles.sectionTitle}>Suggested places and hashtags</Text>
      {searchResults.slice(1, 4).map((result) => (
        <SearchSuggestionCard key={result.id} item={result} onPress={() => openResults(result.title)} />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    color: colors.text,
    ...typography.body,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  tabTextActive: {
    color: colors.white,
  },
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
  },
  chipText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
});
