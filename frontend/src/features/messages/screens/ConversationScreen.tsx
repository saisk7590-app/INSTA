import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Info } from 'lucide-react-native';
import { ChatInput } from '../components/ChatInput';
import { MessageBubble } from '../components/MessageBubble';
import { RootStackParamList } from '../../../navigation/types';
import { colors, spacing } from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

export default function ConversationScreen({ navigation, route }: Props) {
  const conversation = route.params?.conversation;
  const fallbackConversation = useMemo(
    () => ({
      id: 'unknown',
      name: 'Conversation',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: '',
      time: '',
      distance: 'Nearby',
      area: 'Unknown area',
      unreadCount: 0,
    }),
    []
  );
  const activeConversation = conversation ?? fallbackConversation;

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey...', time: '10:18', isOwnMessage: false },
    { id: '2', text: 'Perfect...', time: '10:19', isOwnMessage: true },
  ]);

  const flatListRef = useRef<FlatList>(null);

  const handleSend = (text: string) => {
    const msg = {
      id: Date.now().toString(),
      text,
      time: 'Now',
      isOwnMessage: true,
    };

    setMessages((prev) => [...prev, msg]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔝 HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Image source={{ uri: activeConversation.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{activeConversation.name}</Text>
            <Text style={styles.meta}>{activeConversation.distance}</Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate('ChatDetails', {
              conversation: activeConversation,
            })
          }
        >
          <Info size={20} />
        </Pressable>
      </View>

      {/* 💬 CHAT AREA */}
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble {...item} />}
          style={{ flex: 1 }}
          contentContainerStyle={styles.messages}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      </Pressable>

      {/* ✍️ INPUT (LOCKED AT BOTTOM) */}
      <View style={styles.inputWrapper}>
        <ChatInput onSend={handleSend} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: 'white',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  name: {
    fontWeight: '700',
  },

  meta: {
    color: '#888',
  },

  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 10,
  },

  inputWrapper: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? 6 : 0,
  },
});
