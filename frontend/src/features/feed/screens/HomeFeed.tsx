import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Plus, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostCard } from '../../../components/PostCard';
import { BottomNav } from '../../../components/BottomNav';
import { colors, spacing, theme, typography } from '../../../theme';

const mockPosts = [
  {
    id: 1,
    userName: "Sarah Chen",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    distance: "150 m away",
    postImage: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080",
    caption: "Best coffee spot ☕",
    likes: 42,
  },
  {
    id: 2,
    userName: "Mike Rodriguez",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    distance: "320 m away",
    postImage: "https://images.unsplash.com/photo-1524584830732-b69165ddba9a?w=1080",
    caption: "Night market 🌮",
    likes: 128,
  },
];

export function HomeFeed({ navigation }: any) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [feedType, setFeedType] = useState('Nearby');
  const [showMenu, setShowMenu] = useState(false);

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => setIsLoadingMore(false), 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>

        {/* LEFT ➕ */}
        <TouchableOpacity onPress={() => navigation.navigate('PostCreation')}>
          <Plus size={26} color={colors.text} />
        </TouchableOpacity>

        {/* CENTER DROPDOWN */}
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Text style={styles.headerTitle}>
            {feedType} ▼
          </Text>
        </TouchableOpacity>

        {/* RIGHT ❤️ */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Heart size={26} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 🔽 DROPDOWN */}
      <Modal visible={showMenu} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowMenu(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => {
              setFeedType('Nearby');
              setShowMenu(false);
            }}>
              <Text style={styles.dropdownItem}>Nearby</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setFeedType('Following');
              setShowMenu(false);
            }}>
              <Text style={styles.dropdownItem}>Following</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* 📱 FEED */}
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard {...item} />}
        contentContainerStyle={styles.feedContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={{ margin: spacing.xl }} color={colors.primary} />
          ) : null
        }
      />

      {/* 🔻 BOTTOM NAV */}
      <BottomNav navigation={navigation} activeTab="HomeFeed" />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },

  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: 'bold',
    color: colors.text,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },

  dropdown: {
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.md,
    padding: spacing.sm,
    width: 160,
  },

  dropdownItem: {
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text,
  },

  feedContent: {
    padding: spacing.md,
  },
});
