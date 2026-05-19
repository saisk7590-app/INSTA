import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography, colors, spacing } from '../../theme';
import { Story } from '../../types/social';
import { UserAvatar } from '../common';

type StoryBubbleProps = {
  story: Story;
};

export function StoryBubble({ story }: StoryBubbleProps) {
  return (
    <View style={styles.container}>
      <UserAvatar uri={story.avatar} size={58} ringColors={story.ringColors} />
      <Text numberOfLines={1} style={styles.name}>
        {story.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 74,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  name: {
    marginTop: spacing.sm,
    color: colors.text,
    fontSize: typography.caption.fontSize,
    textAlign: 'center',
  },
});
