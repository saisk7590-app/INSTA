import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../hooks/useAuth';
import { colors, gradients, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { isBootstrapping, isAuthenticated, onboardingCompleted, onboardingDraft, permissions } = useAuth();

  useEffect(() => {
    if (isBootstrapping) return;

    if (isAuthenticated && onboardingCompleted) {
      return;
    }

    if (!onboardingDraft.email) {
      navigation.replace('Login');
      return;
    }

    if (!permissions.locationGranted) {
      navigation.replace('LocationPermission');
      return;
    }

    if (!permissions.notificationsGranted) {
      navigation.replace('NotificationPermission');
      return;
    }

    if (!onboardingDraft.userId) {
      navigation.replace('Signup');
      return;
    }

    if (!onboardingDraft.otpVerified) {
      navigation.replace('OTPVerification');
      return;
    }

    if (!onboardingDraft.username) {
      navigation.replace('UsernameSetup');
      return;
    }

    if (onboardingDraft.interests.length < 3) {
      navigation.replace('InterestSelection');
      return;
    }

    navigation.replace('Login');
  }, [isBootstrapping, isAuthenticated, onboardingCompleted, onboardingDraft, permissions, navigation]);

  return (
    <LinearGradient colors={gradients.screen} style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.title}>Around</Text>
        <Text style={styles.subtitle}>Real-time hyperlocal discovery</Text>
      </View>
      <ActivityIndicator color={colors.accent} size="large" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  logoWrap: {
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    ...typography.title,
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    ...typography.body,
  },
});
