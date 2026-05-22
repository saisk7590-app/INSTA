import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Conversation } from './social';

export type FeedStackParamList = {
  HomeFeed: undefined;
  CreatePost: undefined;
  Notifications: undefined;
  TrendingNearby: undefined;
  PostDetail: { postId: string };
  SavedPosts: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
  NearbyDiscovery: undefined;
  Search: undefined;
  SearchResults: { query: string; category?: string };
  PublicProfile: { userId: string };
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  ChatConversation: { conversationId: string };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  NotificationSettings: undefined;
  PrivacySecurity: undefined;
};

export type ProfileStackParamList = {
  MyProfile: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  PublicProfile: { userId: string };
  Followers: undefined;
  Following: undefined;
  SavedPosts: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  FeedTab: NavigatorScreenParams<FeedStackParamList>;
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>;
  MessagesTab: NavigatorScreenParams<MessagesStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<
    FeedStackParamList &
      ExploreStackParamList &
      MessagesStackParamList &
      ProfileStackParamList &
      SettingsStackParamList
  >
>;

export type PublicProfileRoute = { userId: string };
export type ChatRoute = { conversationId: string };
export type ConversationLookup = Record<string, Conversation>;
