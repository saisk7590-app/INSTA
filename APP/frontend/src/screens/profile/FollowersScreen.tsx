import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer, SearchBar } from '../../components/common';
import { UserListItem } from '../../components/profile';
import { followers } from '../../services/profile';
import { colors, spacing, typography } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Followers'>;

export function FollowersScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  return (
    <ScreenContainer>
      <HeaderBar title="Followers" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <SearchBar placeholder="Search followers" value={query} onChangeText={setQuery} />
      <Text style={styles.helper}>People nearby who follow your updates.</Text>
      {followers.map((user) => (
        <UserListItem key={user.id} user={user} actionLabel="Following" />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  helper: {
    marginVertical: spacing.md,
    color: colors.textSecondary,
    ...typography.caption,
  },
});
