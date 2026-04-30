import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, theme, typography } from '../../../theme';

type MessageBubbleProps = {
  text: string;
  time: string;
  isOwnMessage: boolean;
};

export function MessageBubble({
  text,
  time,
  isOwnMessage,
}: MessageBubbleProps) {
  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownContainer : styles.receivedContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isOwnMessage && styles.ownMessageText,
        ]}
      >
        {text}
      </Text>
      <Text style={[styles.timeText, isOwnMessage && styles.ownTimeText]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '78%',
    borderRadius: theme.border.radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  ownContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: typography.sizes.md,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 4,
  },
  ownMessageText: {
    color: colors.white,
  },
  timeText: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    alignSelf: 'flex-end',
  },
  ownTimeText: {
    color: colors.whiteSoft,
  },
});
