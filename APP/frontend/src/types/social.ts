export type Story = {
  id: string;
  name: string;
  avatar: string;
  ringColors?: string[];
};

export type Post = {
  id: string;
  userName: string;
  handle: string;
  avatar: string;
  distance: string;
  timestamp: string;
  media: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  location: string;
};

export type NearbyItem = {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  category: string;
  image: string;
  meta: string;
};

export type NotificationGroup = {
  title: string;
  items: NotificationItemData[];
};

export type NotificationItemData = {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'mention' | 'alert' | 'message';
  title: string;
  description: string;
  time: string;
  avatar: string;
  unread?: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unreadCount: number;
  distance: string;
};

export type ChatMessage = {
  id: string;
  text?: string;
  type: 'text' | 'media' | 'voice';
  mine: boolean;
  timestamp: string;
  media?: string;
};

export type ProfileStatItem = {
  label: string;
  value: string;
};

export type SearchSuggestion = {
  id: string;
  label: string;
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  distance: string;
  vibe: string;
  badge?: 'Creator' | 'Business';
  mutuals?: string;
};

export type SettingSection = {
  title: string;
  items: {
    id: string;
    label: string;
    subtitle: string;
  }[];
};

export type Comment = {
  id: string;
  userName: string;
  handle: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  distance?: string;
  replies?: Comment[];
};

export type SavedCollection = {
  id: string;
  title: string;
  count: number;
  cover: string;
  accent: string;
};

export type AnalyticsStat = {
  id: string;
  label: string;
  value: string;
  tone?: 'primary' | 'accent' | 'warning';
};

export type SearchCategory =
  | 'Top'
  | 'Users'
  | 'Places'
  | 'Hashtags'
  | 'Businesses';

export type SearchResult = {
  id: string;
  type: 'user' | 'place' | 'hashtag' | 'post' | 'business';
  title: string;
  subtitle: string;
  image?: string;
  distance?: string;
};

export type ToggleSetting = {
  id: string;
  label: string;
  subtitle: string;
  enabled: boolean;
};

export type PrivacyOption = {
  id: string;
  title: string;
  description: string;
  value: string;
};
