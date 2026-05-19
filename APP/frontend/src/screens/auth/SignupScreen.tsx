import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { colors, radii, spacing, typography } from '../../theme';
import { isStrongPassword, isValidEmail, isValidPhone } from '../../utils/authValidation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export function SignupScreen({ navigation }: Props) {
  const { signup, onboardingDraft } = useAuth();
  const [fullName, setFullName] = useState(onboardingDraft.fullName);
  const [email, setEmail] = useState(onboardingDraft.email);
  const [phone, setPhone] = useState(onboardingDraft.phone);
  const [password, setPassword] = useState(onboardingDraft.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit =
    fullName.trim().length >= 2 &&
    isValidEmail(email) &&
    isValidPhone(phone) &&
    isStrongPassword(password) &&
    !loading;

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await signup({ fullName, email, phone, password });
      navigation.navigate('OTPVerification');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Create account" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Field label="Full name" value={fullName} onChangeText={setFullName} placeholder="Sai Kiran" />
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
      <Field label="Phone" value={phone} onChangeText={setPhone} placeholder="+919876543210" />
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="Password123!" secureTextEntry />
      <Text style={styles.help}>Password must include uppercase, lowercase, and a number.</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.primaryButton, !canSubmit && styles.buttonDisabled]} disabled={!canSubmit} onPress={handleSignup}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Sign Up</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryText}>Already have an account? Log in</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldWrap: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.text,
    ...typography.caption,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    ...typography.body,
  },
  help: {
    color: colors.textMuted,
    ...typography.caption,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
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
