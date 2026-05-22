import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { isStrongPassword, isValidEmail } from '../../utils/authValidation';
import { Eye, EyeOff } from 'lucide-react-native';
import { getDemoUsers } from '../../services/authService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login, resetOnboarding } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const [email, setEmail] = useState('sai@test.com');
  const [password, setPassword] = useState('Sai@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoUsers, setDemoUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchDemo = async () => {
      const list = await getDemoUsers();
      setDemoUsers(list);
    };
    fetchDemo();
  }, []);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar title="Welcome back" leftAction="back" onLeftPress={() => navigation.goBack()} />
        <Text style={styles.hint}>Select a demo account below or enter credentials to sign in.</Text>
        
        {demoUsers.length > 0 ? (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Quick Login Switcher</Text>
            <View style={styles.demoRow}>
              {demoUsers.map((user, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.demoButton,
                    email === user.email && styles.demoButtonActive
                  ]}
                  onPress={() => {
                    setEmail(user.email);
                    setPassword(user.password);
                  }}
                >
                  <Text style={styles.demoButtonText}>{user.username}</Text>
                  <Text style={styles.demoButtonPass}>{user.password}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        <Field label="Email" value={email} onChangeText={setEmail} placeholder="sai@test.com" />
        
        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Sai@123"
          secureTextEntry={!showPassword}
          rightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={12}>
              {showPassword ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </Pressable>
          }
        />
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            {(error.toLowerCase().includes('network') || error.toLowerCase().includes('server') || error.toLowerCase().includes('connect')) ? (
              <Pressable style={styles.retryButton} onPress={handleLogin}>
                <Text style={styles.retryButtonText}>Retry Connection</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
        
        <Pressable style={[styles.primaryButton, !canSubmit && styles.buttonDisabled]} disabled={!canSubmit} onPress={handleLogin}>
          {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Log In</Text>}
        </Pressable>
        
        <Pressable style={styles.secondaryButton} onPress={handleCreateAccount}>
          <Text style={styles.secondaryText}>Create new account</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  rightElement?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, props.rightElement ? { paddingRight: 50 } : null]}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize="none"
        />
        {props.rightElement ? (
          <View style={styles.rightElement}>{props.rightElement}</View>
        ) : null}
      </View>
    </View>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  hint: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
    ...typography.body,
  },
  demoContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  demoTitle: {
    color: colors.accent,
    ...typography.caption,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  demoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  demoButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  demoButtonActive: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(49, 208, 170, 0.1)',
  },
  demoButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  demoButtonPass: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  fieldWrap: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.text,
    ...typography.caption,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    width: '100%',
    ...typography.body,
  },
  rightElement: {
    position: 'absolute',
    right: spacing.md,
    alignSelf: 'center',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 75, 75, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 75, 75, 0.25)',
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  errorText: {
    color: colors.danger,
    ...typography.caption,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 75, 75, 0.15)',
    borderWidth: 1,
    borderColor: colors.danger,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: 'bold',
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
