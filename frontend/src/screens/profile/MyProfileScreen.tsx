import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { ProfileStat } from '../../components/profile';
import { myStats, profilePosts, savedCollections } from '../../services/profile';
import { colors, radii, spacing, typography } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'MyProfile'>;

export function MyProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof savedCollections)[number]>('Saved');

  return (
    <ScreenContainer>
      <HeaderBar
        title="Profile"
        rightAction="settings"
        onRightPress={() => navigation.navigate('Settings', { screen: 'SettingsHome' })}
      />

      <View style={styles.headerCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Sai Kiran</Text>
        <Text style={styles.handle}>@saikiran.now • Banjara Hills</Text>
        <Text style={styles.bio}>Building a live map of the city through moments, meetups, and hidden spots.</Text>

        <View style={styles.statsRow}>
          <Pressable onPress={() => navigation.navigate('SavedPosts')}>
            <ProfileStat stat={myStats[0]} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Followers')}>
            <ProfileStat stat={myStats[1]} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Following')}>
            <ProfileStat stat={myStats[2]} />
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.editButton}>
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
        {profilePosts.map((post) => (
          <Image key={`${activeTab}-${post.id}`} source={{ uri: post.image }} style={styles.gridItem} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
