import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, MapPin, Sparkles } from 'lucide-react-native';
import { RootStackParamList } from '../../../navigation/types';
import { colors, spacing, theme, typography } from '../../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PromotePost'>;

const radiusOptions = ['1km', '2km', '5km'] as const;
const durationOptions = ['1 day', '3 days'] as const;

const reachMap = {
  '1km': {
    '1 day': '120-180',
    '3 days': '220-320',
  },
  '2km': {
    '1 day': '260-420',
    '3 days': '520-780',
  },
  '5km': {
    '1 day': '700-980',
    '3 days': '1.1k-1.8k',
  },
} as const;

export function PromotePostScreen({ navigation, route }: Props) {
  const { post } = route.params;
  const [selectedRadius, setSelectedRadius] = useState<(typeof radiusOptions)[number]>('2km');
  const [selectedDuration, setSelectedDuration] = useState<(typeof durationOptions)[number]>('1 day');

  const estimatedReach = useMemo(
    () => reachMap[selectedRadius][selectedDuration],
    [selectedDuration, selectedRadius]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <ArrowLeft size={22} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Promote Post</Text>
            <Text style={styles.subtitle}>Premium reach for people nearby</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Selected Post Preview</Text>
          <Image source={{ uri: post.image }} style={styles.previewImage} />
          <Text style={styles.caption}>{post.caption}</Text>
          <View style={styles.previewMeta}>
            <View style={styles.metaPill}>
              <MapPin size={14} color={colors.secondary} />
              <Text style={styles.metaText}>{post.location}</Text>
            </View>
            <View style={styles.metaPill}>
              <Sparkles size={14} color={colors.primary} />
              <Text style={styles.metaText}>{post.likes}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Radius Selection</Text>
          <View style={styles.chipRow}>
            {radiusOptions.map((option) => {
              const isSelected = option === selectedRadius;

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setSelectedRadius(option)}
                  activeOpacity={0.88}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.chipRow}>
            {durationOptions.map((option) => {
              const isSelected = option === selectedDuration;

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setSelectedDuration(option)}
                  activeOpacity={0.88}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.reachCard}>
          <Text style={styles.reachLabel}>Estimated reach</Text>
          <Text style={styles.reachValue}>{estimatedReach} people nearby</Text>
          <Text style={styles.reachHint}>
            Based on activity, distance density, and recent engagement in {post.location}.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.88}>
          <Text style={styles.ctaText}>Start Promotion 🚀</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: theme.border.radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: theme.border.radius.md,
    marginBottom: spacing.md,
  },
  caption: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  previewMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  metaText: {
    marginLeft: spacing.xs,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.primary,
  },
  reachCard: {
    backgroundColor: colors.accentLight,
    borderRadius: theme.border.radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  reachLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  reachValue: {
    fontSize: typography.sizes.xl,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  reachHint: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: '700',
  },
});
