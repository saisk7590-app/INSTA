import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Sparkles, Users } from 'lucide-react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { ScreenContainer } from '../../components/common';
import { colors, gradients, radii, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <LinearGradient colors={gradients.highlight} style={styles.hero}>
        <Text style={styles.heroTitle}>See your city as it happens.</Text>
        <Text style={styles.heroText}>
          Discover nearby people, fast-growing spots, and the moments your neighborhood is talking about right now.
        </Text>
      </LinearGradient>

      <Feature icon={<MapPin size={20} color={colors.accent} />} title="Live nearby map" text="Track local hotspots, events, and crowd energy in real time." />
      <Feature icon={<Users size={20} color={colors.primarySoft} />} title="People around you" text="Connect with creators, friends, and communities in your radius." />
      <Feature icon={<Sparkles size={20} color={colors.warning} />} title="Trend detection" text="Catch what is rising before everyone else does." />

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('LocationPermission')}>
        <Text style={styles.primaryText}>Get Started</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryText}>I already have an account</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.iconWrap}>{icon}</View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xxl,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  heroTitle: {
    color: colors.white,
    ...typography.title,
  },
  heroText: {
    marginTop: spacing.md,
    color: colors.white,
    opacity: 0.88,
    ...typography.body,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: colors.text,
    ...typography.subheading,
  },
  featureBody: {
    marginTop: 4,
    color: colors.textSecondary,
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
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.textSecondary,
    ...typography.body,
  },
});
