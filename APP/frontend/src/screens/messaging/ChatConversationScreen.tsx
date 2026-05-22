import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Paperclip, Smile, Send } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { MessageBubble } from '../../components/chat';
import { getChats, getMessages, sendMessage } from '../../services/messageService';
import { Conversation, ChatMessage } from '../../types/social';
import { colors, radii, spacing, typography } from '../../theme';
import { MessagesStackParamList } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<MessagesStackParamList, 'ChatConversation'>;

export function ChatConversationScreen({ route, navigation }: Props) {
  const { user } = useAuth();
  const { conversationId } = route.params;

  const [chats, setChats] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');
  
  const flatListRef = useRef<FlatList>(null);

  const loadData = async () => {
    if (!user?.id) return;
    const [chatsData, messagesData] = await Promise.all([
      getChats(user.id),
      getMessages(conversationId, user.id)
    ]);
    setChats(chatsData);
    setMessages(messagesData);
    setLoading(false);
    
    // Scroll to bottom after a tiny delay
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    loadData();
  }, [conversationId, user?.id]);

  const handleSend = async () => {
    if (!messageText.trim() || !user?.id || sending) return;
    setSending(true);
    const sentMsg = await sendMessage(conversationId, user.id, messageText.trim());
    if (sentMsg) {
      setMessages((prev) => [...prev, sentMsg]);
      setMessageText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
    setSending(false);
  };

  const conversation = chats.find((item) => item.id === conversationId);

  if (loading) {
    return (
      <ScreenContainer>
        <HeaderBar title="Chat" leftAction="back" onLeftPress={() => navigation.goBack()} />
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 40 }} />
      </ScreenContainer>
    );
  }

  if (!conversation) {
    return (
      <ScreenContainer>
        <HeaderBar title="Chat" leftAction="back" onLeftPress={() => navigation.goBack()} />
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 40 }}>
          Conversation not found.
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer withScroll={false}>
      <View style={styles.flex}>
        <HeaderBar
          title={conversation.name}
          leftAction="back"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={styles.statusRow}>
          <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
          <Text style={styles.statusText}>
            {conversation.online ? 'Active now' : 'Active recently'} • {conversation.distance}
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputBar}>
          <Pressable style={styles.iconButton}>
            <Smile size={18} color={colors.textSecondary} />
          </Pressable>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Message..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            onSubmitEditing={handleSend}
          />
          <Pressable style={styles.iconButton}>
            <Paperclip size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable
            style={[styles.sendButton, !messageText.trim() && { opacity: 0.5 }]}
            onPress={handleSend}
            disabled={sending || !messageText.trim()}
          >
            {sending ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Send size={18} color={colors.background} />
            )}
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  statusText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  typing: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  typingText: {
    color: colors.textMuted,
    ...typography.caption,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text,
    ...typography.body,
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
