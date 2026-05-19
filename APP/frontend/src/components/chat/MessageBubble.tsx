import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Mic } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { ChatMessage } from '../../types/social';

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const mine = message.mine;

  return (
    <View style={[styles.row, mine && styles.rowMine]}>
      <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
        {message.type === 'media' && message.media ? (
          <Image source={{ uri: message.media }} style={styles.media} />
        ) : null}
        {message.type === 'voice' ? (
          <View style={styles.voiceRow}>
            <Mic size={16} color={mine ? colors.background : colors.text} />
            <Text style={[styles.text, mine && styles.mineText]}>{message.text}</Text>
          </View>
        ) : null}
        {message.type === 'text' ? (
          <Text style={[styles.text, mine && styles.mineText]}>{message.text}</Text>
        ) : null}
      </View>
      <Text style={styles.time}>{message.timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.md,
  },
  mine: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: 8,
  },
  theirs: {
    backgroundColor: colors.surfaceAlt,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
    ...typography.body,
  },
  mineText: {
    color: colors.background,
    fontWeight: '600',
  },
  media: {
    width: 180,
    height: 180,
    borderRadius: radii.md,
  },
  time: {
    marginTop: 4,
    color: colors.textMuted,
    ...typography.caption,
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
