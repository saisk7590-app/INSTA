import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { colors, radii, spacing, typography } from '../../theme';
import { isStrongPassword, isValidEmail } from '../../utils/authValidation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login, resetOnboarding } = useAuth();
  const [email, setEmail] = useState('demo@test.com');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = isValidEmail(email) && isStrongPassword(password) && !loading;

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    await resetOnboarding();
    navigation.replace('Onboarding');
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Welcome back" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <Text style={styles.hint}>Use `demo@test.com` and `Password123!` for the demo login.</Text>
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="demo@test.com" />
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="Password123!" secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.primaryButton, !canSubmit && styles.buttonDisabled]} disabled={!canSubmit} onPress={handleLogin}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Log In</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleCreateAccount}>
        <Text style={styles.secondaryText}>Create new account</Text>
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
  hint: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
    ...typography.body,
  },
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
  error: {
    color: colors.danger,
    marginBottom: spacing.md,
    ...typography.caption,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
    marginTop: spacing.md,
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
