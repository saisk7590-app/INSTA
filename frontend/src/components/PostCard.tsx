import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, theme } from '../theme';

export function PostCard({
  userImage,
  userName,
  distance,
  postImage,
  caption,
  likes = 0,
  comments = 0
}: any) {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>

      {/* 🔝 HEADER */}
      <View style={styles.header}>
        <Image source={{ uri: userImage }} style={styles.avatar} />

        <View style={styles.headerText}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.distance}>📍 {distance}</Text>
        </View>

        <TouchableOpacity>
          <MoreHorizontal size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 🖼 IMAGE */}
      <Image source={{ uri: postImage }} style={styles.postImage} />

      {/* ❤️ ACTIONS */}
      <View style={styles.actions}>

        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Heart
              size={26}
              color={liked ? 'red' : colors.text}
              fill={liked ? 'red' : 'none'}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MessageCircle size={26} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Send size={26} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Bookmark size={26} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 📝 CONTENT */}
      <View style={styles.content}>
        {likes > 0 && (
          <Text style={styles.likes}>{likes} likes</Text>
        )}

        <Text style={styles.caption}>
          <Text style={styles.bold}>{userName}</Text> {caption}
        </Text>

        {comments > 0 && (
          <Text style={styles.comments}>
            View all {comments} comments
          </Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing.sm,
  },

  headerText: {
    flex: 1,
  },

  userName: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
  },

  distance: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  postImage: {
    width: '100%',
    height: 350,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.sm,
  },

  leftActions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },

  content: {
    paddingHorizontal: spacing.sm,
  },

  likes: {
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.text,
  },

  caption: {
    fontSize: 14,
    color: colors.text,
  },

  bold: {
    fontWeight: '700',
  },

  comments: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
