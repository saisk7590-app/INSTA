import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Bookmark } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { SavedCollection } from '../../types/social';

type Props = {
  collection: SavedCollection;
};

export function SavedCollectionCard({ collection }: Props) {
  return (
    <ImageBackground source={{ uri: collection.cover }} style={styles.card} imageStyle={styles.image}>
      <View style={[styles.overlay, { backgroundColor: `${collection.accent}55` }]}>
        <Bookmark size={18} color={colors.white} />
        <Text style={styles.title}>{collection.title}</Text>
        <Text style={styles.count}>{collection.count} saved posts</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 210,
    height: 150,
    marginRight: spacing.md,
  },
  image: {
    borderRadius: radii.lg,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  title: {
    marginTop: spacing.md,
    color: colors.text,
    ...typography.subheading,
  },
  count: {
    marginTop: 4,
    color: colors.textSecondary,
    ...typography.caption,
  },
});
