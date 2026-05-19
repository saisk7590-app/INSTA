import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatConversationScreen, MessagesListScreen } from '../screens/messaging';
import { MessagesStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<MessagesStackParamList>();

const stackOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
};

export default function MessageStackNavigator() {
  return (
    <Stack.Navigator id="messages-stack" screenOptions={stackOptions}>
      <Stack.Screen name="MessagesList" component={MessagesListScreen} />
      <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
    </Stack.Navigator>
  );
}
