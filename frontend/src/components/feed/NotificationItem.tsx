import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BellRing, Heart, MessageCircle, Sparkles, UserPlus } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { NotificationItemData } from '../../types/social';
import { UserAvatar } from '../common';

type NotificationItemProps = {
  item: NotificationItemData;
};

const typeIconMap = {
  follow: <UserPlus size={16} color={colors.text} />,
  like: <Heart size={16} color={colors.text} />,
  comment: <MessageCircle size={16} color={colors.text} />,
  mention: <Sparkles size={16} color={colors.text} />,
  alert: <BellRing size={16} color={colors.text} />,
  message: <MessageCircle size={16} color={colors.text} />,
};

export function NotificationItem({ item }: NotificationItemProps) {
  return (
    <View style={[styles.container, item.unread && styles.unread]}>
      <UserAvatar uri={item.avatar} size={46} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.meta}>
        <View style={styles.iconWrap}>{typeIconMap[item.type]}</View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  unread: {
    borderColor: 'rgba(124,92,255,0.4)',
    backgroundColor: 'rgba(124,92,255,0.09)',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    color: colors.text,
    ...typography.subheading,
  },
  description: {
    color: colors.textSecondary,
    marginTop: 2,
    ...typography.caption,
  },
  meta: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  time: {
    color: colors.textMuted,
    ...typography.caption,
  },
});
