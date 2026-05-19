import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { UserListItem } from '../../components/profile';
import { following } from '../../services/profile';
import { colors, spacing, typography } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Following'>;

export function FollowingScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <HeaderBar title="Following" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.helper}>Creators, friends, and businesses you keep tabs on.</Text>
      {following.map((user) => (
        <UserListItem key={user.id} user={user} actionLabel={user.badge ?? 'Following'} />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  helper: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
    ...typography.caption,
  },
});
