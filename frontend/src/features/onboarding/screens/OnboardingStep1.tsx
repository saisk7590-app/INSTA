import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

export function OnboardingStep1({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Users size={128} color={colors.primary} strokeWidth={1.5} />
        </View>
        
        <Text style={styles.title}>Welcome to NearBy</Text>
        <Text style={styles.subtitle}>
          Discover what's happening around you. Connect with your local community.
        </Text>
      </View>
      
      {/* Bottom section */}
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding2')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
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
  header: {
    alignItems: 'flex-end',
    padding: spacing.xxl,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
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
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: theme.border.radius.xl,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
