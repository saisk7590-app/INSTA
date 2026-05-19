import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer, SearchBar } from '../../components/common';
import { conversations } from '../../services/messaging';
import { colors, radii, spacing, typography } from '../../theme';
import { MessagesStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<MessagesStackParamList, 'MessagesList'>;

export function MessagesListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return conversations;

    return conversations.filter((item) =>
      `${item.name} ${item.lastMessage}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subtitle}>Recent chats and nearby connections.</Text>
      <SearchBar
        placeholder="Search conversations"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ChatConversation', { conversationId: item.id })}
          >
            <View>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.online ? <View style={styles.onlineDot} /> : null}
            </View>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.preview}>{item.lastMessage}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            {item.unreadCount ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            ) : null}
          </Pressable>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    ...typography.title,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.lg,
    ...typography.body,
  },
  list: {
    paddingTop: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  onlineDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.background,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    color: colors.text,
    ...typography.subheading,
  },
  time: {
    color: colors.textMuted,
    ...typography.caption,
  },
  preview: {
    color: colors.textSecondary,
    ...typography.body,
  },
  distance: {
    color: colors.accent,
    marginTop: 4,
    ...typography.caption,
  },
  badge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: colors.white,
    ...typography.caption,
  },
});
