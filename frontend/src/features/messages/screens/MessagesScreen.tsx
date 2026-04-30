import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { BottomNav } from '../../../components/BottomNav';
import { ConversationItem } from '../components/ConversationItem';
import { ConversationRouteData, RootStackParamList } from '../../../navigation/types';
import { colors, spacing, theme, typography } from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Messages'>;

const conversations: ConversationRouteData[] = [
  {
    id: '1',
    name: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    lastMessage: 'I can meet near the metro in ten minutes.',
    time: '2m',
    distance: '0.8 km',
    area: 'Madhapur',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Nisha Rao',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    lastMessage: 'That food reel was perfect for our lane.',
    time: '14m',
    distance: '1.2 km',
    area: 'Hitech City',
    unreadCount: 0,
  },
];

export default function MessagesScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return conversations;

    return conversations.filter((c) =>
      `${c.name} ${c.lastMessage} ${c.area}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* 🔥 HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>
            People active near your location 📍
          </Text>
        </View>

        {/* 🔍 SEARCH */}
        <View style={styles.searchBar}>
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search chats, people, places"
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
          />
        </View>

        {/* 📭 EMPTY STATE */}
        {filteredConversations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No conversations found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching a name or location
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConversationItem
                conversation={item}
                onPress={() =>
                  navigation.navigate('Conversation', { conversation: item })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomNav navigation={navigation} activeTab="Messages" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  header: {
    marginBottom: spacing.md,
  },

  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text,
  },

  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },

  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: typography.sizes.md,
  },

  listContent: {
    paddingBottom: spacing.xl,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },

  emptySubtitle: {
    marginTop: 6,
    color: colors.textSecondary,
  },
});