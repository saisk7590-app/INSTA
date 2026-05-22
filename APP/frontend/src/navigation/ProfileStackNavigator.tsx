import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SavedPostsScreen } from '../screens/feed';
import {
  FollowersScreen,
  FollowingScreen,
  MyProfileScreen,
  PublicUserProfileScreen,
  EditProfileScreen,
} from '../screens/profile';
import SettingsStackNavigator from './SettingsStackNavigator';
import { ProfileStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator id="profile-stack" screenOptions={stackOptions}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsStackNavigator} />
      <Stack.Screen name="PublicProfile" component={PublicUserProfileScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
