import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

export function OnboardingStep3({ navigation }: any) {
  const handleAllow = () => {
    navigation.navigate('SignIn');
  };
  
  const handleNotNow = () => {
    navigation.navigate('SignIn');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Navigation size={128} color={colors.primary} strokeWidth={1.5} />
          <View style={styles.pingContainer}>
            <View style={styles.ping} />
          </View>
        </View>
        
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          We need your location to show you nearby posts and connect you with your local community.
        </Text>
        <Text style={styles.disclaimer}>
          Your exact location is never shared publicly.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>
        
        <TouchableOpacity
          onPress={handleAllow}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Allow Location Access</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleNotNow}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  imageContainer: {
    width: 256,
    height: 256,
    backgroundColor: colors.primaryLight,
    borderRadius: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    position: 'relative',
  },
  pingContainer: {
    position: 'absolute',
    top: 32,
    right: 48,
  },
  ping: {
    width: 16,
    height: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: spacing.sm,
  },
  disclaimer: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xxxl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.xxl,
  },
  indicator: {
    width: 8,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
  },
  activeIndicator: {
    width: 32,
    backgroundColor: colors.primary,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: theme.border.radius.xl,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    borderRadius: theme.border.radius.xl,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 18,
    fontWeight: '600',
  },
});
