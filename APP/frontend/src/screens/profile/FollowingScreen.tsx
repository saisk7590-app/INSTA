import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { UserListItem } from '../../components/profile';
import { getUserFollowing } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { Creator } from '../../types/social';
import { spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Following'>;

export function FollowingScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [followingList, setFollowingList] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user?.id) {
        setLoading(true);
        const data = await getUserFollowing(user.id);
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.username,
          handle: '@' + item.username,
          avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
          distance: `${item.followers_count} followers`,
          vibe: item.bio || 'Active member',
          mutuals: item.mutual_follow ? `Follows you back • ${item.following_count} following` : `${item.following_count} following`,
          badge: 'Following' as const
        }));
        setFollowingList(mapped);
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [user?.id]);

  return (
    <ScreenContainer>
      <HeaderBar title="Following" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.helper}>Creators, friends, and businesses you keep tabs on.</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: spacing.xl }} />
      ) : followingList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You aren't following anyone yet.</Text>
        </View>
      ) : (
        followingList.map((item) => (
          <UserListItem
            key={item.id}
            user={item}
            actionLabel={item.badge}
            onPress={() => navigation.navigate('PublicProfile', { userId: item.id })}
          />
        ))
      )}
    </ScreenContainer>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  helper: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
    ...typography.caption,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    ...typography.body,
  },
});
