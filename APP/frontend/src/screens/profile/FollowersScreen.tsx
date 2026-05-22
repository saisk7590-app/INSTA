import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer, SearchBar } from '../../components/common';
import { UserListItem } from '../../components/profile';
import { getUserFollowers } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { Creator } from '../../types/social';
import { spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Followers'>;

export function FollowersScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [query, setQuery] = useState('');
  const [followersList, setFollowersList] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (user?.id) {
        setLoading(true);
        const data = await getUserFollowers(user.id);
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.username,
          handle: '@' + item.username,
          avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
          distance: `${item.followers_count} followers`,
          vibe: item.bio || 'Active member',
          mutuals: item.mutual_follow ? `Follows you back • ${item.following_count} following` : `${item.following_count} following`,
          badge: item.mutual_follow ? ('Mutual' as const) : ('Follower' as const)
        }));
        setFollowersList(mapped);
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [user?.id]);

  const filteredFollowers = followersList.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.handle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScreenContainer>
      <HeaderBar title="Followers" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <SearchBar placeholder="Search followers" value={query} onChangeText={setQuery} />
      <Text style={styles.helper}>People nearby who follow your updates.</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: spacing.xl }} />
      ) : filteredFollowers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No followers found.</Text>
        </View>
      ) : (
        filteredFollowers.map((item) => (
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
    marginVertical: spacing.md,
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
