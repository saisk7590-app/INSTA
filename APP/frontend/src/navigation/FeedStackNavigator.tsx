import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeFeedScreen,
  NotificationsScreen,
  PostDetailScreen,
  SavedPostsScreen,
  TrendingNearbyScreen,
} from '../screens/feed';
import { CreatePostScreen } from '../screens/post';
import { FeedStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<FeedStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator id="feed-stack" screenOptions={stackOptions}>
      <Stack.Screen name="HomeFeed" component={HomeFeedScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="TrendingNearby" component={TrendingNearbyScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
    </Stack.Navigator>
  );
}
