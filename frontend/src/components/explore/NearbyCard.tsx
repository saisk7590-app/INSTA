import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircleMore } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { NearbyItem } from '../../types/social';

type NearbyCardProps = {
  item: NearbyItem;
  onPress?: () => void;
  onPressComments?: () => void;
};

export function NearbyCard({ item, onPress, onPressComments }: NearbyCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: item.image }} style={styles.cardFill} imageStyle={styles.image}>
        <LinearGradient colors={['transparent', 'rgba(6,7,10,0.94)']} style={styles.overlay}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.category}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <View style={styles.footer}>
            <Text style={styles.distance}>{item.distance}</Text>
            {onPressComments ? (
              <Pressable onPress={onPressComments} style={styles.commentPill}>
                <MessageCircleMore size={14} color={colors.text} />
                <Text style={styles.commentText}>Thread</Text>
              </Pressable>
            ) : (
              <Text style={styles.meta}>{item.meta}</Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 240,
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
    justifyContent: 'flex-end',
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginBottom: spacing.sm,
  },
  chipText: {
    color: colors.text,
    ...typography.caption,
  },
  title: {
    color: colors.text,
    ...typography.subheading,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
    ...typography.caption,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  distance: {
    color: colors.accent,
    ...typography.caption,
  },
  meta: {
    color: colors.text,
    ...typography.caption,
  },
  commentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  commentText: {
    color: colors.text,
    ...typography.caption,
  },
});
