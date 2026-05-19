import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { profilePosts, publicProfiles } from '../../services/profile';
import { colors, radii, spacing, typography } from '../../theme';
import { ExploreStackParamList, ProfileStackParamList } from '../../types/navigation';

type ExploreProps = NativeStackScreenProps<ExploreStackParamList, 'PublicProfile'>;
type ProfileProps = NativeStackScreenProps<ProfileStackParamList, 'PublicProfile'>;
type Props = ExploreProps | ProfileProps;

export function PublicUserProfileScreen({ route, navigation }: Props) {
  const profile = publicProfiles[route.params.userId as keyof typeof publicProfiles] ?? publicProfiles.u1;

  return (
    <ScreenContainer>
      <HeaderBar title={profile.name} leftAction="back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.headerCard}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.handle}>{profile.handle}</Text>
        <Text style={styles.distance}>{profile.distance}</Text>
        <Text style={styles.mutuals}>{profile.mutuals}</Text>

        <View style={styles.buttonRow}>
          <Pressable style={styles.followButton}>
            <Text style={styles.followText}>Follow</Text>
          </Pressable>
          <Pressable style={styles.messageButton}>
            <Text style={styles.messageText}>Message</Text>
          </Pressable>
        </View>

        <View style={styles.interestRow}>
          {profile.interests.map((interest) => (
            <View key={interest} style={styles.interestChip}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.postsTitle}>Posts</Text>
      <View style={styles.grid}>
        {profilePosts.map((post) => (
          <Image key={post.id} source={{ uri: post.image }} style={styles.gridItem} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
