import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { RootStackParamList, PromotePostRouteData } from '../../../navigation/types';
import { colors, spacing, theme, typography } from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectPost'>;

const mockPosts: PromotePostRouteData[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    caption: 'Best coffee spot after sunset.',
    location: 'Madhapur',
    likes: '184 likes',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1524584830732-b69165ddba9a?w=800',
    caption: 'Street market energy tonight.',
    location: 'Gachibowli',
    likes: '263 likes',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    caption: 'New ramen place near the junction.',
    location: 'Hitech City',
    likes: '302 likes',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800',
    caption: 'Morning crowd at the lake loop.',
    location: 'Kondapur',
    likes: '119 likes',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    caption: 'Quick pizza stop with local delivery.',
    location: 'Jubilee Hills',
    likes: '227 likes',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    caption: 'Brunch board for the weekend crowd.',
    location: 'Madhapur',
    likes: '172 likes',
  },
];

export function SelectPostScreen({ navigation }: Props) {
  const [selectedPostId, setSelectedPostId] = useState(mockPosts[0].id);

  const selectedPost = useMemo(
    () => mockPosts.find((post) => post.id === selectedPostId) ?? mockPosts[0],
    [selectedPostId]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Select Post</Text>
          <Text style={styles.subtitle}>Choose what to promote nearby</Text>
        </View>
      </View>

      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedPostId;

          return (
            <TouchableOpacity
              style={[styles.postCard, isSelected && styles.selectedPostCard]}
              onPress={() => setSelectedPostId(item.id)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.postImage} />
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.footer}>
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>Selected</Text>
          <Text style={styles.selectedCaption} numberOfLines={1}>
            {selectedPost.caption}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('PromotePost', { post: selectedPost })}
          activeOpacity={0.88}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  grid: {
    paddingHorizontal: spacing.md,
    paddingBottom: 120,
  },
  row: {
    gap: spacing.sm,
  },
  postCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: theme.border.radius.md,
    overflow: 'hidden',
    margin: spacing.xs,
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: colors.surface,
  },
  selectedPostCard: {
    borderColor: colors.primary,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  selectedInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  selectedLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: 2,
  },
  selectedCaption: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    paddingVertical: 12,
  },
  nextButtonText: {
    fontSize: typography.sizes.md,
    color: colors.white,
    fontWeight: '700',
  },
});
