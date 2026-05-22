import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'InterestSelection'>;

const interestOptions = [
  'Coffee',
  'Street food',
  'Night markets',
  'Live music',
  'Photo walks',
  'Fitness',
  'Startups',
  'Art shows',
  'Hidden cafes',
  'Weekend pop-ups',
];

export function InterestSelectionScreen({ navigation }: Props) {
  const { finalizeInterests, onboardingDraft } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [selected, setSelected] = useState<string[]>(onboardingDraft.interests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggle = (value: string) => {
    setSelected((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const handleFinish = async () => {
    setLoading(true);
    setError('');
    try {
      if (selected.length < 3) {
        throw new Error('Choose at least 3 interests to continue.');
      }
      await finalizeInterests(selected);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to finish onboarding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Choose interests" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.body}>Pick at least 3 things you want more of in your local feed.</Text>
      <View style={styles.chipGrid}>
        {interestOptions.map((interest) => {
          const active = selected.includes(interest);
          return (
            <Pressable key={interest} style={[styles.chip, active && styles.chipActive]} onPress={() => toggle(interest)}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{interest}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.primaryButton, (selected.length < 3 || loading) && styles.buttonDisabled]} disabled={selected.length < 3 || loading} onPress={handleFinish}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Finish Setup</Text>}
      </Pressable>
    </ScreenContainer>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  body: {
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    ...typography.body,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  chipTextActive: {
    color: colors.white,
  },
  error: {
    marginTop: spacing.lg,
    color: colors.danger,
    ...typography.caption,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryText: {
    color: colors.background,
    ...typography.subheading,
  },
});
