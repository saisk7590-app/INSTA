import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { SearchSuggestionCard } from '../../components/explore';
import { searchResults } from '../../services/location';
import { colors, spacing, typography } from '../../theme';
import { ExploreStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ExploreStackParamList, 'SearchResults'>;

export function SearchResultsScreen({ route, navigation }: Props) {
  const results = searchResults.filter((item) =>
    `${item.title} ${item.subtitle}`.toLowerCase().includes(route.params.query.toLowerCase()) ||
    route.params.query === 'nearby'
  );

  return (
    <ScreenContainer withScroll={false}>
      <View style={styles.flex}>
        <View style={styles.inner}>
          <HeaderBar title={route.params.query} leftAction="back" onLeftPress={() => navigation.goBack()} />
          <Text style={styles.subtitle}>
            {route.params.category ?? 'Top'} results around your current location
          </Text>

          <View style={styles.skeletonRow}>
            <ActivityIndicator color={colors.primarySoft} />
            <Text style={styles.loadingText}>Refreshing local search graph...</Text>
          </View>

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <SearchSuggestionCard
                item={item}
                onPress={() =>
                  item.type === 'user' ? navigation.navigate('PublicProfile', { userId: 'u1' }) : undefined
                }
              />
            )}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
    ...typography.body,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  loadingText: {
    color: colors.textMuted,
    ...typography.caption,
  },
  list: {
    paddingBottom: 160,
  },
});
