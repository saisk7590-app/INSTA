import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Pencil, Menu } from 'lucide-react-native';
import { BottomNav } from '../../../components/BottomNav';
import { RootStackParamList } from '../../../navigation/types';
import { colors, gradients, spacing } from '../../../theme';
import { NearbyTab } from '../components/NearbyTab';
import { PostsTab } from '../components/PostsTab';
import { SavedTab } from '../components/SavedTab';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type ProfileTab = 'Posts' | 'Nearby' | 'Saved';

const profileTabs: ProfileTab[] = ['Posts', 'Nearby', 'Saved'];

export default function ProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('Posts');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Menu size={24} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditAvatar')}
            activeOpacity={0.85}
          >
            <Pencil size={14} color={colors.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Sai Kiran</Text>
        <Text style={styles.identity}>Building apps for local businesses</Text>
        <Text style={styles.location}>Madhapur, Hyderabad</Text>
        <Text style={styles.radius}>Active in your area • 2 km</Text>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>320</Text>
          <Text style={styles.statLabel}>Reach (2km)</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Engagement</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('SelectPost')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Promote Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {profileTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabItem}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab ? <View style={styles.activeIndicator} /> : null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'Posts' && <PostsTab />}
        {activeTab === 'Nearby' && <NearbyTab />}
        {activeTab === 'Saved' && <SavedTab />}
      </View>

      <BottomNav navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  menuIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  identity: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  radius: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderRadius: 20,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  secondaryButtonText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  activeIndicator: {
    marginTop: 4,
    height: 2,
    width: 25,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
});
