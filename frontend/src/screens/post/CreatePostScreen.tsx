import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImagePlus, MapPin, Tag, Users } from 'lucide-react-native';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { colors, radii, spacing, typography } from '../../theme';
import { FeedStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<FeedStackParamList, 'CreatePost'>;

const audiences = ['Close Friends', 'Local Circle', 'Public'];

export function CreatePostScreen({ navigation }: Props) {
  const [selectedAudience, setSelectedAudience] = useState('Local Circle');

  return (
    <ScreenContainer>
      <HeaderBar
        title="Create Post"
        leftAction="back"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.previewCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200' }}
          style={styles.previewImage}
        />
        <View style={styles.previewOverlay}>
          <ImagePlus size={18} color={colors.text} />
          <Text style={styles.previewText}>Add photo or short clip</Text>
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Caption</Text>
        <TextInput
          multiline
          placeholder="Share what is happening around you..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </View>

      <ActionRow icon={<MapPin size={18} color={colors.accent} />} label="Add location" value="Jubilee Hills, Hyderabad" />
      <ActionRow icon={<Tag size={18} color={colors.primarySoft} />} label="Tag people" value="Add collaborators nearby" />
      <ActionRow icon={<Users size={18} color={colors.warning} />} label="Audience" value={selectedAudience} />

      <View style={styles.audienceRow}>
        {audiences.map((audience) => {
          const active = audience === selectedAudience;

          return (
            <Pressable
              key={audience}
              onPress={() => setSelectedAudience(audience)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {audience}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.postButton}>
        <Text style={styles.postButtonText}>Post Now</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function ActionRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.actionRow}>
      <View style={styles.actionLabelRow}>
        {icon}
        <Text style={styles.actionLabel}>{label}</Text>
      </View>
      <Text style={styles.actionValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    height: 280,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.overlay,
  },
  previewText: {
    color: colors.text,
    ...typography.caption,
  },
  inputCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  label: {
    color: colors.text,
    marginBottom: spacing.sm,
    ...typography.subheading,
  },
  input: {
    minHeight: 100,
    color: colors.text,
    textAlignVertical: 'top',
    ...typography.body,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  actionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionLabel: {
    color: colors.text,
    ...typography.body,
  },
  actionValue: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  audienceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  chipTextActive: {
    color: colors.white,
  },
  postButton: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  postButtonText: {
    color: colors.background,
    ...typography.subheading,
  },
});
