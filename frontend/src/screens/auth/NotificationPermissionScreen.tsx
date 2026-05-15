import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BellRing } from 'lucide-react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { colors, radii, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'NotificationPermission'>;

const simulatePermissionPrompt = () =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 700);
  });

export function NotificationPermissionScreen({ navigation }: Props) {
  const { setPermissions } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleContinue = async (ask: boolean) => {
    setLoading(true);
    try {
      const granted = ask ? await simulatePermissionPrompt() : false;
      await setPermissions({ notificationsGranted: granted || !ask });
      navigation.navigate('Signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <HeaderBar title="Stay in the Loop" leftAction="back" onLeftPress={() => navigation.goBack()} />
      <View style={styles.hero}>
        <BellRing size={48} color={colors.primarySoft} />
      </View>
      <Text style={styles.title}>Get the good alerts, skip the noise.</Text>
      <Text style={styles.body}>
        Enable notifications for nearby spikes, messages, mentions, and the trends that matter to you.
      </Text>
      <Pressable style={styles.primaryButton} onPress={() => handleContinue(true)} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryText}>Enable Notifications</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => handleContinue(false)} disabled={loading}>
        <Text style={styles.secondaryText}>Skip for now</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    alignSelf: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    ...typography.title,
  },
  body: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.body,
  },
  primaryButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  primaryText: {
    color: colors.background,
    ...typography.subheading,
  },
  secondaryButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    paddingVertical: 16,
  },
  secondaryText: {
    color: colors.textSecondary,
    ...typography.body,
  },
});
