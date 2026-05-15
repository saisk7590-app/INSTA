import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowUpRight, Hash, MapPin, Sparkles, UserRound } from 'lucide-react-native';
import { colors, radii, spacing, typography } from '../../theme';
import { SearchResult } from '../../types/social';

type Props = {
  item: SearchResult;
  onPress?: () => void;
};

export function SearchSuggestionCard({ item, onPress }: Props) {
  const icon =
    item.type === 'user' ? <UserRound size={16} color={colors.primarySoft} /> :
    item.type === 'place' || item.type === 'business' ? <MapPin size={16} color={colors.accent} /> :
    item.type === 'hashtag' ? <Hash size={16} color={colors.warning} /> :
    <Sparkles size={16} color={colors.primarySoft} />;

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>{icon}</View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <ArrowUpRight size={16} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.text,
    ...typography.body,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 2,
    ...typography.caption,
  },
});
