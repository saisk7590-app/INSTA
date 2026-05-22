import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { ProfileStat } from '../../components/profile';
import { savedCollections } from '../../services/profile';
import { fetchUserPosts } from '../../services/api';
import { getUserStats } from '../../services/userService';
import { Post } from '../../types/social';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyProfile'>;

export function MyProfileScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<(typeof savedCollections)[number]>('Saved');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.id && isFocused) {
        setLoading(true);
        try {
          const [postsData, statsData] = await Promise.all([
            fetchUserPosts(user.id),
            getUserStats(user.id)
          ]);
          setUserPosts(postsData);
          setStats(statsData);
        } catch (error) {
          console.error('Error loading profile data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProfileData();
  }, [user?.id, isFocused]);

  return (
    <ScreenContainer>
      <HeaderBar
        title="Profile"
        rightAction="settings"
        onRightPress={() => navigation.navigate('Settings', { screen: 'SettingsHome' })}
      />

      <View style={styles.headerCard}>
        <Image
          source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.fullName || 'Sai Kiran'}</Text>
        <Text style={styles.handle}>@{user?.username || 'saikiran.now'} • {user?.location || 'Banjara Hills'}</Text>
        <Text style={styles.bio}>{user?.bio || 'Building a live map of the city through moments, meetups, and hidden spots.'}</Text>

        <View style={styles.statsRow}>
          <Pressable onPress={() => navigation.navigate('SavedPosts')}>
            <ProfileStat stat={{ label: 'Posts', value: stats.posts.toString() }} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Followers')}>
            <ProfileStat stat={{ label: 'Followers', value: stats.followers.toString() }} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Following')}>
            <ProfileStat stat={{ label: 'Following', value: stats.following.toString() }} />
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('SavedPosts')}>
            <Text style={styles.secondaryButtonText}>Saved</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.tabRow}>
        {savedCollections.map((item) => {
          const active = item === activeTab;

          return (
            <Pressable
              key={item}
              onPress={() => setActiveTab(item)}
              style={[styles.tabButton, active && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.grid}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.accent} style={{ flex: 1, marginVertical: spacing.lg }} />
        ) : userPosts.length === 0 ? (
          <Text style={{ color: colors.textSecondary, textAlign: 'center', flex: 1, marginVertical: spacing.lg }}>No posts yet.</Text>
        ) : (
          userPosts.map((post) => (
            <Pressable
              key={`${activeTab}-${post.id}`}
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
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.md,
  },
  name: {
    color: colors.text,
    ...typography.heading,
  },
  handle: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
  bio: {
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
    ...typography.body,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  editButtonText: {
    color: colors.white,
    ...typography.subheading,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.pill,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: colors.text,
    ...typography.subheading,
  },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  tabButtonActive: {
    backgroundColor: colors.accent,
  },
  tabText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  tabTextActive: {
    color: colors.background,
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
