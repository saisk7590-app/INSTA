import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, MessageCircleMore } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { NearbyItem } from '../../types/social';

type Props = {
  item: NearbyItem;
  heat: string;
  onPress?: () => void;
  onPressComments?: () => void;
};

export function TrendingCard({ item, heat, onPress, onPressComments }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardFill} imageStyle={styles.image}>
        <LinearGradient colors={['transparent', 'rgba(6,7,10,0.96)']} style={styles.overlay}>
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Flame size={14} color={colors.warning} />
              <Text style={styles.badgeText}>{heat}</Text>
            </View>
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.meta}>{item.subtitle}</Text>
            {onPressComments ? (
              <Pressable onPress={onPressComments} style={styles.commentPill}>
                <MessageCircleMore size={14} color={colors.text} />
              </Pressable>
            ) : null}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 180,
    marginRight: spacing.md,
  },
  cardFill: {
    flex: 1,
  },
  image: {
    borderRadius: radii.lg,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(6,7,10,0.65)',
  },
  badgeText: {
    color: colors.text,
    ...typography.caption,
  },
  distance: {
    color: colors.text,
    ...typography.caption,
  },
  title: {
    color: colors.text,
    ...typography.heading,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  meta: {
    flex: 1,
    color: colors.textSecondary,
    ...typography.caption,
  },
  commentPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
