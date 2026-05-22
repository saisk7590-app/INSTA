import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { sendOtp } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTPVerification'>;

export function OTPVerificationScreen({ navigation }: Props) {
  const { verifyOtp, onboardingDraft } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((current) => current - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      await verifyOtp(code);
      navigation.navigate('UsernameSetup');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    await sendOtp(onboardingDraft.phone || onboardingDraft.email);
    setTimer(30);
    setResending(false);
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Verify OTP" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.body}>Enter the 6-digit code we sent to {onboardingDraft.phone || onboardingDraft.email}.</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.otpInput}
        placeholder="123456"
        placeholderTextColor={colors.textMuted}
      />
      <Text style={styles.hint}>Demo OTP: 123456</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.primaryButton, code.length !== 6 && styles.buttonDisabled]} disabled={code.length !== 6 || loading} onPress={handleVerify}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Verify</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleResend} disabled={timer > 0 || resending}>
        <Text style={styles.secondaryText}>{timer > 0 ? `Resend in ${timer}s` : resending ? 'Resending...' : 'Resend OTP'}</Text>
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
  otpInput: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    paddingVertical: 18,
    textAlign: 'center',
    letterSpacing: 12,
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  hint: {
    marginTop: spacing.md,
    color: colors.textMuted,
    ...typography.caption,
  },
  error: {
    marginTop: spacing.md,
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
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.textSecondary,
    ...typography.body,
  },
});
