import { api } from './api';
import { Conversation, ChatMessage } from '../types/social';

export async function getChats(userId: string): Promise<Conversation[]> {
  try {
    const response = await api.get(`/messages/chats?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
}

export async function getMessages(conversationId: string, userId: string): Promise<ChatMessage[]> {
  try {
    const response = await api.get(`/messages/conversations/${conversationId}?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendMessage(conversationId: string, userId: string, text: string): Promise<ChatMessage | null> {
  try {
    const response = await api.post(`/messages/conversations/${conversationId}`, {
      userId,
      text,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}
