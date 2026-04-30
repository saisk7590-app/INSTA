import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { ArrowLeft, Heart, MessageCircle, UserPlus, MapPin } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?w=200',
    message: 'liked your post',
    time: '5m ago',
    postImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=200',
  },
  {
    id: 2,
    type: 'comment',
    user: 'Mike Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1611095006856-19f5ffdca7f1?w=200',
    message: 'commented: "This looks amazing! 😍"',
    time: '12m ago',
    postImage: 'https://images.unsplash.com/photo-1524584830732-b69165ddba9a?w=200',
  },
  {
    id: 3,
    type: 'nearby',
    user: 'Emma Wilson',
    userImage: 'https://images.unsplash.com/photo-1545311630-51ea4a4c84de?w=200',
    message: 'posted nearby',
    time: '1h ago',
    postImage: 'https://images.unsplash.com/photo-1774268503699-5fad483fa226?w=200',
  },
];

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case 'like':
      return <Heart size={12} color="white" fill="white" />;
    case 'comment':
      return <MessageCircle size={12} color="white" fill="white" />;
    case 'follow':
      return <UserPlus size={12} color="white" fill="white" />;
    case 'nearby':
      return <MapPin size={12} color="white" fill="white" />;
    default:
      return <Heart size={12} color="white" fill="white" />;
  }
}

function getIconBg(type: string) {
  switch (type) {
    case 'like': return colors.error;
    case 'comment': return colors.secondary;
    case 'follow': return colors.primary;
    case 'nearby': return colors.success;
    default: return colors.textSecondary;
  }
}

export function NotificationsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeFeed')}>
          <ArrowLeft size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      
      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.userImage }} style={styles.avatar} />
              <View style={[styles.iconBadge, { backgroundColor: getIconBg(item.type) }]}>
                <NotificationIcon type={item.type} />
              </View>
            </View>
            
            <View style={styles.textContent}>
              <Text style={styles.messageText}>
                <Text style={styles.userName}>{item.user}</Text> {item.message}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            
            {item.postImage && (
              <Image source={{ uri: item.postImage }} style={styles.postThumbnail} />
            )}
            
            {item.type === 'follow' && (
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  textContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  userName: {
    fontWeight: 'bold',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  postThumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginLeft: 12,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.border.radius.md,
    marginLeft: 12,
  },
  followButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
