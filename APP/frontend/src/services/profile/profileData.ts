import { creators } from '../location';
import { posts } from '../feed';
import {
  Creator,
  PrivacyOption,
  ProfileStatItem,
  SettingSection,
  ToggleSetting,
} from '../../types/social';

export const myStats: ProfileStatItem[] = [
  { label: 'Posts', value: '128' },
  { label: 'Followers', value: '3.2k' },
  { label: 'Following', value: '418' },
];

export const savedCollections = ['Saved', 'Tagged'] as const;

export const profilePosts = posts.map((post) => ({
  id: post.id,
  image: post.media,
}));

export const settingsSections: SettingSection[] = [
  {
    title: 'Account',
    items: [
      { id: 'notifications', label: 'Notification Settings', subtitle: 'Push, mentions, nearby activity' },
      { id: 'privacy', label: 'Privacy & Security', subtitle: 'Visibility, sessions, login protection' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'saved', label: 'Saved Posts', subtitle: 'Collections and bookmarked moments' },
      { id: 'help', label: 'Help Center', subtitle: 'FAQ, contact support, report issue' },
      { id: 'logout', label: 'Log Out', subtitle: 'Sign out and return to the login screen' },
    ],
  },
];

export const publicProfiles = {
  u1: {
    id: 'u1',
    name: 'Aarya Singh',
    handle: '@aarya.moves',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
    distance: '300 m away',
    mutuals: '12 mutual connections',
    interests: ['Dance', 'Nightlife', 'Street food'],
  },
  u2: {
    id: 'u2',
    name: 'Kabir Khan',
    handle: '@kabirwalks',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    distance: '900 m away',
    mutuals: '8 mutual connections',
    interests: ['Photography', 'Maps', 'Cafes'],
  },
  u3: {
    id: 'u3',
    name: 'Noor Ali',
    handle: '@noor.eats',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    distance: '1.4 km away',
    mutuals: '5 mutual connections',
    interests: ['Food', 'Reviews', 'Pop-ups'],
  },
} as const;

export const followers: Creator[] = creators;

export const following: Creator[] = [
  creators[0],
  creators[1],
  { ...creators[2], badge: 'Business', vibe: 'Late night desserts and local picks' },
];

export const notificationSettingsData: ToggleSetting[] = [
  { id: 'push', label: 'Push notifications', subtitle: 'App-wide alerts and priority updates', enabled: true },
  { id: 'messages', label: 'Message alerts', subtitle: 'Instant new message notifications', enabled: true },
  { id: 'nearby', label: 'Nearby activity alerts', subtitle: 'When your area gets active in real time', enabled: true },
  { id: 'trending', label: 'Trending alerts', subtitle: 'Fast-growing moments around you', enabled: false },
  { id: 'mentions', label: 'Mention alerts', subtitle: 'Replies, tags, and shoutouts', enabled: true },
  { id: 'sound', label: 'Sound and vibration', subtitle: 'Audio cues and haptic alerts', enabled: false },
];

export const privacyOptions: PrivacyOption[] = [
  { id: 'private', title: 'Private account', description: 'Only approved followers can view your full profile.', value: 'Off' },
  { id: 'location', title: 'Location visibility', description: 'Controls who can see your exact distance and area.', value: 'Friends' },
  { id: 'sessions', title: 'Session management', description: 'Review active devices and sign out remotely.', value: '3 active' },
  { id: '2fa', title: 'Two-factor authentication', description: 'Add another layer of sign-in protection.', value: 'Enabled' },
  { id: 'login', title: 'Login activity', description: 'Recent sign-ins, devices, and alerts.', value: 'Today' },
  { id: 'blocked', title: 'Blocked users', description: 'Manage people and businesses you have blocked.', value: '14' },
  { id: 'data', title: 'Data permissions', description: 'Camera, microphone, and location access controls.', value: 'Custom' },
];
