import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { OnboardingStep1 } from '../features/onboarding/screens/OnboardingStep1';
import { OnboardingStep2 } from '../features/onboarding/screens/OnboardingStep2';
import { OnboardingStep3 } from '../features/onboarding/screens/OnboardingStep3';
import { SignInScreen } from '../features/auth/screens/SignInScreen';
import { HomeFeed } from '../features/feed/screens/HomeFeed';
import { PostCreation } from '../features/post/screens/PostCreation';
import { NotificationsScreen } from '../features/notifications/screens/NotificationsScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import MessagesScreen from '../features/messages/screens/MessagesScreen';
import ConversationScreen  from '../features/messages/screens/ConversationScreen';
import { ChatDetailsScreen } from '../features/messages/screens/ChatDetailsScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import { SettingsScreen } from '../features/profile/settings/SettingsScreen';
import { EditProfileScreen } from '../features/profile/settings/EditProfileScreen';
import { EditAvatarScreen } from '../features/profile/settings/EditAvatarScreen';
import { PrivacyScreen } from '../features/profile/settings/PrivacyScreen';
import { NotificationsSettingsScreen } from '../features/profile/settings/NotificationsSettingsScreen';
import { AccountSettingsScreen } from '../features/profile/settings/AccountSettingsScreen';
import { SelectPostScreen } from '../features/promote/screens/SelectPostScreen';
import { PromotePostScreen } from '../features/promote/screens/PromotePostScreen';
import { BusinessProfile } from '../features/business/screens/BusinessProfile';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id="root"
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding1" component={OnboardingStep1} />
      <Stack.Screen name="Onboarding2" component={OnboardingStep2} />
      <Stack.Screen name="Onboarding3" component={OnboardingStep3} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="HomeFeed" component={HomeFeed} />
      <Stack.Screen name="PostCreation" component={PostCreation} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditAvatar" component={EditAvatarScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettingsScreen}
      />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="SelectPost" component={SelectPostScreen} />
      <Stack.Screen name="PromotePost" component={PromotePostScreen} />
      <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
    </Stack.Navigator>
  );
}
