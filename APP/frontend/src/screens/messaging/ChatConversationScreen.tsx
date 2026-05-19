import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Paperclip, Smile, Mic } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { MessageBubble } from '../../components/chat';
import { chatMessages, conversations } from '../../services/messaging';
import { colors, radii, spacing, typography } from '../../theme';
import { MessagesStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<MessagesStackParamList, 'ChatConversation'>;

export function ChatConversationScreen({ route, navigation }: Props) {
  const [message, setMessage] = useState('');
  const conversation = conversations.find((item) => item.id === route.params.conversationId) ?? conversations[0];
  const messages = chatMessages[conversation.id] ?? [];

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
            {conversation.online ? 'Active now' : 'Last seen 20m ago'} • {conversation.distance}
          </Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.typing}>
          <Text style={styles.typingText}>{conversation.name} is typing...</Text>
        </View>

        <View style={styles.inputBar}>
          <Pressable style={styles.iconButton}>
            <Smile size={18} color={colors.textSecondary} />
          </Pressable>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Message..."
            placeholderTextColor={colors.textMuted}
            style={styles.input}
          />
          <Pressable style={styles.iconButton}>
            <Paperclip size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.sendButton}>
            <Mic size={18} color={colors.background} />
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
