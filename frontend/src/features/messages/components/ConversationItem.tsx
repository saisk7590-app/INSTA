import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConversationRouteData } from '../../../navigation/types';
import { colors, spacing, theme, typography } from '../../../theme';

type ConversationItemProps = {
  conversation: ConversationRouteData;
  onPress: () => void;
};

export function ConversationItem({
  conversation,
  onPress,
}: ConversationItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Image source={{ uri: conversation.avatar }} style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {conversation.name}
          </Text>
          <Text style={styles.time}>{conversation.time}</Text>
        </View>

        <Text style={styles.message} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.distance}>{conversation.distance} away</Text>
          {conversation.unreadCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  name: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.text,
    marginRight: spacing.md,
  },
  time: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  message: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    fontSize: typography.sizes.sm,
    color: colors.secondary,
    fontWeight: '600',
  },
  badge: {
    minWidth: 22,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: '700',
  },
});
