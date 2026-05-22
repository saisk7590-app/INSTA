import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { isValidUsername } from '../../utils/authValidation';

type Props = NativeStackScreenProps<AuthStackParamList, 'UsernameSetup'>;

const taken = ['sai_kiran', 'aroundhq', 'nisha', 'kabirwalks'];

export function UsernameSetupScreen({ navigation }: Props) {
  const { finalizeUsername, onboardingDraft } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [username, setUsername] = useState(onboardingDraft.username);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const suggestions = useMemo(
    () => ['saikiran_now', 'sai_local', 'saikiran_live'],
    []
  );

  const handleContinue = async () => {
    setLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (taken.includes(username.toLowerCase())) {
        throw new Error('That username is already taken.');
      }
      await finalizeUsername(username.trim().toLowerCase());
      navigation.navigate('InterestSelection');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reserve username.');
    } finally {
      setLoading(false);
    }
  };

  const valid = isValidUsername(username);

  return (
    <ScreenContainer>
      <HeaderBar title="Choose username" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.body}>Pick the handle people nearby will recognize you by.</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholder="saikiran_now"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />
      <Text style={styles.hint}>3-20 characters, letters, numbers, and underscores only.</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.suggestionsTitle}>Suggestions</Text>
      <View style={styles.suggestionRow}>
        {suggestions.map((item) => (
          <Pressable key={item} style={styles.suggestionChip} onPress={() => setUsername(item)}>
            <Text style={styles.suggestionText}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={[styles.primaryButton, (!valid || loading) && styles.buttonDisabled]} disabled={!valid || loading} onPress={handleContinue}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Continue</Text>}
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
  input: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    ...typography.body,
  },
  hint: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    ...typography.caption,
  },
  error: {
    marginTop: spacing.md,
    color: colors.danger,
    ...typography.caption,
  },
  suggestionsTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    color: colors.text,
    ...typography.subheading,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
  },
  suggestionText: {
    color: colors.textSecondary,
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
