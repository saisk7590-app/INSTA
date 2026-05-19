import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Grid2X2, Rows3 } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { SavedCollectionCard } from '../../components/feed';
import { profilePosts } from '../../services/profile';
import { savedCollectionsData } from '../../services/feed';
import { colors, radii, spacing, typography } from '../../theme';

export function SavedPostsScreen() {
  const [mode, setMode] = useState<'grid' | 'list'>('grid');

  return (
    <ScreenContainer>
      <HeaderBar title="Saved Posts" />

      <Text style={styles.sectionTitle}>Collections</Text>
      <FlatList
        data={savedCollectionsData}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SavedCollectionCard collection={item} />}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.toolbar}>
        <Text style={styles.sectionTitle}>Bookmarks</Text>
        <View style={styles.toggleGroup}>
          <Pressable onPress={() => setMode('grid')} style={[styles.toggleButton, mode === 'grid' && styles.toggleActive]}>
            <Grid2X2 size={16} color={mode === 'grid' ? colors.background : colors.textSecondary} />
          </Pressable>
          <Pressable onPress={() => setMode('list')} style={[styles.toggleButton, mode === 'list' && styles.toggleActive]}>
            <Rows3 size={16} color={mode === 'list' ? colors.background : colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      {profilePosts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyText}>Bookmark local moments to build collections here.</Text>
        </View>
      ) : mode === 'grid' ? (
        <View style={styles.grid}>
          {profilePosts.map((post) => (
            <Image key={post.id} source={{ uri: post.image }} style={styles.gridItem} />
          ))}
        </View>
      ) : (
        <View>
          {profilePosts.map((post) => (
            <Image key={post.id} source={{ uri: post.image }} style={styles.listItem} />
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    ...typography.heading,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  toggleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  toggleActive: {
    backgroundColor: colors.accent,
  },
  emptyState: {
    padding: spacing.xxl,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.text,
    ...typography.heading,
  },
  emptyText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '31.5%',
    aspectRatio: 1,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
  listItem: {
    width: '100%',
    height: 220,
    borderRadius: radii.lg,
    marginBottom: spacing.md,
  },
});
