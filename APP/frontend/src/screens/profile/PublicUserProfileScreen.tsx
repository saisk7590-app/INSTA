import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { fetchUserProfile, fetchUserPosts } from '../../services/api';
import { Post } from '../../types/social';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { ExploreStackParamList, ProfileStackParamList } from '../../types/navigation';

type ExploreProps = NativeStackScreenProps<ExploreStackParamList, 'PublicProfile'>;
type ProfileProps = NativeStackScreenProps<ProfileStackParamList, 'PublicProfile'>;
type Props = ExploreProps | ProfileProps;

export function PublicUserProfileScreen({ route, navigation }: Props) {
  const { userId } = route.params;
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const profileData = await fetchUserProfile(userId);
      const postsData = await fetchUserPosts(userId);
      setProfile(profileData);
      setPosts(postsData);
      setLoading(false);
    };
    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <ScreenContainer>
        <HeaderBar title="Profile" leftAction="back" onLeftPress={() => navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 40 }} />
      </ScreenContainer>
    );
  }

  if (!profile) {
    return (
      <ScreenContainer>
        <HeaderBar title="Profile" leftAction="back" onLeftPress={() => navigation.goBack()} />
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 40 }}>User not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <HeaderBar title={profile.fullName || profile.username} leftAction="back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.headerCard}>
        <Image
          source={{ uri: profile.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' }}
          style={styles.avatar}
        />
        <Text style={styles.handle}>@{profile.username}</Text>
        <Text style={styles.distance}>{profile.followers_count ?? profile.followersCount ?? 0} followers • {profile.following_count ?? profile.followingCount ?? 0} following</Text>
        <Text style={styles.mutuals}>{profile.bio || 'Check out my posts below!'}</Text>

        <View style={styles.buttonRow}>
          <Pressable style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </Pressable>
          <Pressable style={styles.messageButton}>
            <Text style={styles.messageText}>Message</Text>
          </Pressable>
        </View>

        <View style={styles.interestRow}>
          {(profile.interests || ['Local', 'Moments']).map((interest: string) => (
            <View key={interest} style={styles.interestChip}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.postsTitle}>Posts</Text>
      <View style={styles.grid}>
        {posts.length === 0 ? (
          <Text style={{ color: colors.textSecondary, textAlign: 'center', flex: 1, marginVertical: spacing.lg }}>No posts yet.</Text>
        ) : (
          posts.map((post) => (
            <Pressable
              key={post.id}
              onPress={() => navigation.getParent()?.navigate('FeedTab', { screen: 'PostDetail', params: { postId: post.id } })}
            >
              <Image source={{ uri: post.media }} style={styles.gridItem} />
            </Pressable>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  headerCard: {
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    marginBottom: spacing.md,
  },
  handle: {
    color: colors.text,
    ...typography.heading,
  },
  distance: {
    color: colors.accent,
    marginTop: 4,
    ...typography.caption,
  },
  mutuals: {
    color: colors.textSecondary,
    marginTop: 6,
    ...typography.body,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  followButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.pill,
  },
  followText: {
    color: colors.background,
    ...typography.subheading,
  },
  messageButton: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  messageText: {
    color: colors.text,
    ...typography.subheading,
  },
  interestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  interestChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  interestText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  postsTitle: {
    color: colors.text,
    marginVertical: spacing.lg,
    ...typography.heading,
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
});
