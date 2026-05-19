import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NotificationSettingsScreen,
  PrivacySecurityScreen,
  SettingsScreen,
} from '../screens/settings';
import { SettingsStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator id="settings-stack" screenOptions={stackOptions}>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
    </Stack.Navigator>
  );
}
