import React, { useMemo, useState, useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { ScreenContainer, SearchBar } from '../../components/common';
import { getChats } from '../../services/messageService';
import { Conversation } from '../../types/social';
import { colors, radii, spacing, typography } from '../../theme';
import { MessagesStackParamList } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<MessagesStackParamList, 'MessagesList'>;

export function MessagesListScreen({ navigation }: Props) {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [chats, setChats] = useState<Conversation[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadChats = async () => {
    if (!user?.id) return;
    const data = await getChats(user.id);
    setChats(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused && user?.id) {
      loadChats();
    }
  }, [isFocused, user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadChats();
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return chats;

    return chats.filter((item) =>
      `${item.name} ${item.lastMessage}`.toLowerCase().includes(normalized)
    );
  }, [query, chats]);

  return (
    <ScreenContainer
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
    >
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subtitle}>Recent chats and nearby connections.</Text>
      <SearchBar
        placeholder="Search conversations"
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 40 }} />
      ) : filtered.length === 0 ? (
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 40 }}>
          No conversations found.
        </Text>
      ) : (
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
      )}
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
